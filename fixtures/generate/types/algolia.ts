declare const routes: import('@hono/zod-openapi').OpenAPIHono<
  import('hono/types').Env,
  {
    '/:path': {
      $get:
        | {
            input: { param: { path: string } } & {
              query: { parameters?: { [x: string]: unknown } | undefined }
            }
            output: { [x: string]: unknown }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { param: { path: string } } & {
              query: { parameters?: { [x: string]: unknown } | undefined }
            }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 400
          }
        | {
            input: { param: { path: string } } & {
              query: { parameters?: { [x: string]: unknown } | undefined }
            }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 402
          }
        | {
            input: { param: { path: string } } & {
              query: { parameters?: { [x: string]: unknown } | undefined }
            }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 403
          }
        | {
            input: { param: { path: string } } & {
              query: { parameters?: { [x: string]: unknown } | undefined }
            }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 404
          }
      $post:
        | {
            input: { param: { path: string } } & {
              query: { parameters?: { [x: string]: unknown } | undefined }
            } & { json: { [x: string]: unknown } }
            output: { [x: string]: unknown }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { param: { path: string } } & {
              query: { parameters?: { [x: string]: unknown } | undefined }
            } & { json: { [x: string]: unknown } }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 400
          }
        | {
            input: { param: { path: string } } & {
              query: { parameters?: { [x: string]: unknown } | undefined }
            } & { json: { [x: string]: unknown } }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 402
          }
        | {
            input: { param: { path: string } } & {
              query: { parameters?: { [x: string]: unknown } | undefined }
            } & { json: { [x: string]: unknown } }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 403
          }
        | {
            input: { param: { path: string } } & {
              query: { parameters?: { [x: string]: unknown } | undefined }
            } & { json: { [x: string]: unknown } }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 404
          }
      $put:
        | {
            input: { param: { path: string } } & {
              query: { parameters?: { [x: string]: unknown } | undefined }
            } & { json: { [x: string]: unknown } }
            output: { [x: string]: unknown }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { param: { path: string } } & {
              query: { parameters?: { [x: string]: unknown } | undefined }
            } & { json: { [x: string]: unknown } }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 400
          }
        | {
            input: { param: { path: string } } & {
              query: { parameters?: { [x: string]: unknown } | undefined }
            } & { json: { [x: string]: unknown } }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 402
          }
        | {
            input: { param: { path: string } } & {
              query: { parameters?: { [x: string]: unknown } | undefined }
            } & { json: { [x: string]: unknown } }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 403
          }
        | {
            input: { param: { path: string } } & {
              query: { parameters?: { [x: string]: unknown } | undefined }
            } & { json: { [x: string]: unknown } }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 404
          }
      $delete:
        | {
            input: { param: { path: string } } & {
              query: { parameters?: { [x: string]: unknown } | undefined }
            }
            output: { [x: string]: unknown }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { param: { path: string } } & {
              query: { parameters?: { [x: string]: unknown } | undefined }
            }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 400
          }
        | {
            input: { param: { path: string } } & {
              query: { parameters?: { [x: string]: unknown } | undefined }
            }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 402
          }
        | {
            input: { param: { path: string } } & {
              query: { parameters?: { [x: string]: unknown } | undefined }
            }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 403
          }
        | {
            input: { param: { path: string } } & {
              query: { parameters?: { [x: string]: unknown } | undefined }
            }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 404
          }
    }
  } & {
    '/1/indexes/:indexName/query': {
      $post:
        | {
            input: { param: { indexName: string } } & {
              json:
                | { params?: string | undefined }
                | {
                    query?: string | undefined
                    similarQuery?: string | undefined
                    filters?: string | undefined
                    facetFilters?: unknown[] | string | undefined
                    optionalFilters?: unknown[] | string | undefined
                    numericFilters?: unknown[] | string | undefined
                    tagFilters?: unknown[] | string | undefined
                    sumOrFiltersScores?: boolean | undefined
                    restrictSearchableAttributes?: string[] | undefined
                    facets?: string[] | undefined
                    facetingAfterDistinct?: boolean | undefined
                    page?: number | undefined
                    offset?: number | undefined
                    length?: number | undefined
                    aroundLatLng?: string | undefined
                    aroundLatLngViaIP?: boolean | undefined
                    aroundRadius?: number | 'all' | undefined
                    aroundPrecision?:
                      | number
                      | { from?: number | undefined; value?: number | undefined }[]
                      | undefined
                    minimumAroundRadius?: number | undefined
                    insideBoundingBox?:
                      | string
                      | ({ [x: string]: unknown } | null)
                      | number[][]
                      | undefined
                    insidePolygon?: number[][] | undefined
                    naturalLanguages?:
                      | (
                          | 'af'
                          | 'ar'
                          | 'az'
                          | 'bg'
                          | 'bn'
                          | 'ca'
                          | 'cs'
                          | 'cy'
                          | 'da'
                          | 'de'
                          | 'el'
                          | 'en'
                          | 'eo'
                          | 'es'
                          | 'et'
                          | 'eu'
                          | 'fa'
                          | 'fi'
                          | 'fo'
                          | 'fr'
                          | 'ga'
                          | 'gl'
                          | 'he'
                          | 'hi'
                          | 'hu'
                          | 'hy'
                          | 'id'
                          | 'is'
                          | 'it'
                          | 'ja'
                          | 'ka'
                          | 'kk'
                          | 'ko'
                          | 'ku'
                          | 'ky'
                          | 'lt'
                          | 'lv'
                          | 'mi'
                          | 'mn'
                          | 'mr'
                          | 'ms'
                          | 'mt'
                          | 'nb'
                          | 'nl'
                          | 'no'
                          | 'ns'
                          | 'pl'
                          | 'ps'
                          | 'pt'
                          | 'pt-br'
                          | 'qu'
                          | 'ro'
                          | 'ru'
                          | 'sk'
                          | 'sq'
                          | 'sv'
                          | 'sw'
                          | 'ta'
                          | 'te'
                          | 'th'
                          | 'tl'
                          | 'tn'
                          | 'tr'
                          | 'tt'
                          | 'uk'
                          | 'ur'
                          | 'uz'
                          | 'zh'
                        )[]
                      | undefined
                    ruleContexts?: string[] | undefined
                    personalizationImpact?: number | undefined
                    userToken?: string | undefined
                    getRankingInfo?: boolean | undefined
                    synonyms?: boolean | undefined
                    clickAnalytics?: boolean | undefined
                    analytics?: boolean | undefined
                    analyticsTags?: string[] | undefined
                    percentileComputation?: boolean | undefined
                    enableABTest?: boolean | undefined
                    attributesToRetrieve?: string[] | undefined
                    ranking?: string[] | undefined
                    relevancyStrictness?: number | undefined
                    attributesToHighlight?: string[] | undefined
                    attributesToSnippet?: string[] | undefined
                    highlightPreTag?: string | undefined
                    highlightPostTag?: string | undefined
                    snippetEllipsisText?: string | undefined
                    restrictHighlightAndSnippetArrays?: boolean | undefined
                    hitsPerPage?: number | undefined
                    minWordSizefor1Typo?: number | undefined
                    minWordSizefor2Typos?: number | undefined
                    typoTolerance?: boolean | 'min' | 'strict' | 'true' | 'false' | undefined
                    allowTyposOnNumericTokens?: boolean | undefined
                    disableTypoToleranceOnAttributes?: string[] | undefined
                    ignorePlurals?:
                      | (
                          | 'af'
                          | 'ar'
                          | 'az'
                          | 'bg'
                          | 'bn'
                          | 'ca'
                          | 'cs'
                          | 'cy'
                          | 'da'
                          | 'de'
                          | 'el'
                          | 'en'
                          | 'eo'
                          | 'es'
                          | 'et'
                          | 'eu'
                          | 'fa'
                          | 'fi'
                          | 'fo'
                          | 'fr'
                          | 'ga'
                          | 'gl'
                          | 'he'
                          | 'hi'
                          | 'hu'
                          | 'hy'
                          | 'id'
                          | 'is'
                          | 'it'
                          | 'ja'
                          | 'ka'
                          | 'kk'
                          | 'ko'
                          | 'ku'
                          | 'ky'
                          | 'lt'
                          | 'lv'
                          | 'mi'
                          | 'mn'
                          | 'mr'
                          | 'ms'
                          | 'mt'
                          | 'nb'
                          | 'nl'
                          | 'no'
                          | 'ns'
                          | 'pl'
                          | 'ps'
                          | 'pt'
                          | 'pt-br'
                          | 'qu'
                          | 'ro'
                          | 'ru'
                          | 'sk'
                          | 'sq'
                          | 'sv'
                          | 'sw'
                          | 'ta'
                          | 'te'
                          | 'th'
                          | 'tl'
                          | 'tn'
                          | 'tr'
                          | 'tt'
                          | 'uk'
                          | 'ur'
                          | 'uz'
                          | 'zh'
                        )[]
                      | 'true'
                      | 'false'
                      | boolean
                      | undefined
                    removeStopWords?:
                      | (
                          | 'af'
                          | 'ar'
                          | 'az'
                          | 'bg'
                          | 'bn'
                          | 'ca'
                          | 'cs'
                          | 'cy'
                          | 'da'
                          | 'de'
                          | 'el'
                          | 'en'
                          | 'eo'
                          | 'es'
                          | 'et'
                          | 'eu'
                          | 'fa'
                          | 'fi'
                          | 'fo'
                          | 'fr'
                          | 'ga'
                          | 'gl'
                          | 'he'
                          | 'hi'
                          | 'hu'
                          | 'hy'
                          | 'id'
                          | 'is'
                          | 'it'
                          | 'ja'
                          | 'ka'
                          | 'kk'
                          | 'ko'
                          | 'ku'
                          | 'ky'
                          | 'lt'
                          | 'lv'
                          | 'mi'
                          | 'mn'
                          | 'mr'
                          | 'ms'
                          | 'mt'
                          | 'nb'
                          | 'nl'
                          | 'no'
                          | 'ns'
                          | 'pl'
                          | 'ps'
                          | 'pt'
                          | 'pt-br'
                          | 'qu'
                          | 'ro'
                          | 'ru'
                          | 'sk'
                          | 'sq'
                          | 'sv'
                          | 'sw'
                          | 'ta'
                          | 'te'
                          | 'th'
                          | 'tl'
                          | 'tn'
                          | 'tr'
                          | 'tt'
                          | 'uk'
                          | 'ur'
                          | 'uz'
                          | 'zh'
                        )[]
                      | boolean
                      | undefined
                    queryLanguages?:
                      | (
                          | 'af'
                          | 'ar'
                          | 'az'
                          | 'bg'
                          | 'bn'
                          | 'ca'
                          | 'cs'
                          | 'cy'
                          | 'da'
                          | 'de'
                          | 'el'
                          | 'en'
                          | 'eo'
                          | 'es'
                          | 'et'
                          | 'eu'
                          | 'fa'
                          | 'fi'
                          | 'fo'
                          | 'fr'
                          | 'ga'
                          | 'gl'
                          | 'he'
                          | 'hi'
                          | 'hu'
                          | 'hy'
                          | 'id'
                          | 'is'
                          | 'it'
                          | 'ja'
                          | 'ka'
                          | 'kk'
                          | 'ko'
                          | 'ku'
                          | 'ky'
                          | 'lt'
                          | 'lv'
                          | 'mi'
                          | 'mn'
                          | 'mr'
                          | 'ms'
                          | 'mt'
                          | 'nb'
                          | 'nl'
                          | 'no'
                          | 'ns'
                          | 'pl'
                          | 'ps'
                          | 'pt'
                          | 'pt-br'
                          | 'qu'
                          | 'ro'
                          | 'ru'
                          | 'sk'
                          | 'sq'
                          | 'sv'
                          | 'sw'
                          | 'ta'
                          | 'te'
                          | 'th'
                          | 'tl'
                          | 'tn'
                          | 'tr'
                          | 'tt'
                          | 'uk'
                          | 'ur'
                          | 'uz'
                          | 'zh'
                        )[]
                      | undefined
                    decompoundQuery?: boolean | undefined
                    enableRules?: boolean | undefined
                    enablePersonalization?: boolean | undefined
                    queryType?: 'prefixLast' | 'prefixAll' | 'prefixNone' | undefined
                    removeWordsIfNoResults?:
                      | 'none'
                      | 'lastWords'
                      | 'firstWords'
                      | 'allOptional'
                      | undefined
                    mode?: 'neuralSearch' | 'keywordSearch' | undefined
                    semanticSearch?:
                      | { eventSources?: string[] | ({ [x: string]: unknown } | null) | undefined }
                      | undefined
                    advancedSyntax?: boolean | undefined
                    optionalWords?:
                      | string
                      | ({ [x: string]: unknown } | null)
                      | string[]
                      | undefined
                    disableExactOnAttributes?: string[] | undefined
                    exactOnSingleWordQuery?: 'attribute' | 'none' | 'word' | undefined
                    alternativesAsExact?:
                      | (
                          | 'ignorePlurals'
                          | 'singleWordSynonym'
                          | 'multiWordsSynonym'
                          | 'ignoreConjugations'
                        )[]
                      | undefined
                    advancedSyntaxFeatures?: ('exactPhrase' | 'excludeWords')[] | undefined
                    distinct?: boolean | number | undefined
                    replaceSynonymsInHighlight?: boolean | undefined
                    minProximity?: number | undefined
                    responseFields?: string[] | undefined
                    maxValuesPerFacet?: number | undefined
                    sortFacetValuesBy?: string | undefined
                    attributeCriteriaComputedByMinProximity?: boolean | undefined
                    renderingContent?:
                      | {
                          facetOrdering?:
                            | {
                                facets?: { order?: string[] | undefined } | undefined
                                values?:
                                  | {
                                      [x: string]: {
                                        order?: string[] | undefined
                                        sortRemainingBy?: 'count' | 'alpha' | 'hidden' | undefined
                                        hide?: string[] | undefined
                                      }
                                    }
                                  | undefined
                              }
                            | undefined
                          redirect?: { url?: string | undefined } | undefined
                          widgets?:
                            | {
                                banners?:
                                  | {
                                      image?:
                                        | {
                                            urls?: { url?: string | undefined }[] | undefined
                                            title?: string | undefined
                                          }
                                        | undefined
                                      link?: { url?: string | undefined } | undefined
                                    }[]
                                  | undefined
                              }
                            | undefined
                        }
                      | undefined
                    enableReRanking?: boolean | undefined
                    reRankingApplyFilter?:
                      | unknown[]
                      | string
                      | ({ [x: string]: unknown } | null)
                      | undefined
                  }
            }
            output: {
              abTestID?: number | undefined
              abTestVariantID?: number | undefined
              aroundLatLng?: string | undefined
              automaticRadius?: string | undefined
              exhaustive?:
                | {
                    facetsCount?: boolean | undefined
                    facetValues?: boolean | undefined
                    nbHits?: boolean | undefined
                    rulesMatch?: boolean | undefined
                    typo?: boolean | undefined
                  }
                | undefined
              appliedRules?: { [x: string]: unknown }[] | undefined
              exhaustiveFacetsCount?: boolean | undefined
              exhaustiveNbHits?: boolean | undefined
              exhaustiveTypo?: boolean | undefined
              facets?: { [x: string]: { [x: string]: number } } | undefined
              facets_stats?:
                | {
                    [x: string]: {
                      min?: number | undefined
                      max?: number | undefined
                      avg?: number | undefined
                      sum?: number | undefined
                    }
                  }
                | undefined
              index?: string | undefined
              indexUsed?: string | undefined
              message?: string | undefined
              nbSortedHits?: number | undefined
              parsedQuery?: string | undefined
              processingTimeMS?: number | undefined
              processingTimingsMS?: { [x: string]: unknown } | undefined
              queryAfterRemoval?: string | undefined
              redirect?:
                | {
                    index?:
                      | {
                          source: string
                          dest: string
                          reason: string
                          succeed: boolean
                          data: { ruleObjectID: string }
                        }[]
                      | undefined
                  }
                | undefined
              renderingContent?:
                | {
                    facetOrdering?:
                      | {
                          facets?: { order?: string[] | undefined } | undefined
                          values?:
                            | {
                                [x: string]: {
                                  order?: string[] | undefined
                                  sortRemainingBy?: 'count' | 'alpha' | 'hidden' | undefined
                                  hide?: string[] | undefined
                                }
                              }
                            | undefined
                        }
                      | undefined
                    redirect?: { url?: string | undefined } | undefined
                    widgets?:
                      | {
                          banners?:
                            | {
                                image?:
                                  | {
                                      urls?: { url?: string | undefined }[] | undefined
                                      title?: string | undefined
                                    }
                                  | undefined
                                link?: { url?: string | undefined } | undefined
                              }[]
                            | undefined
                        }
                      | undefined
                  }
                | undefined
              serverTimeMS?: number | undefined
              serverUsed?: string | undefined
              userData?: { [x: string]: unknown } | undefined
              queryID?: string | undefined
              _automaticInsights?: boolean | undefined
              page?: number | undefined
              nbHits?: number | undefined
              nbPages?: number | undefined
              hitsPerPage?: number | undefined
              hits: {
                objectID: string
                _highlightResult?:
                  | {
                      [x: string]:
                        | {
                            value: string
                            matchLevel: 'none' | 'partial' | 'full'
                            matchedWords: string[]
                            fullyHighlighted?: boolean | undefined
                          }
                        | unknown
                        | unknown[]
                    }
                  | undefined
                _snippetResult?:
                  | {
                      [x: string]:
                        | { value: string; matchLevel: 'none' | 'partial' | 'full' }
                        | unknown
                        | unknown[]
                    }
                  | undefined
                _rankingInfo?:
                  | {
                      filters?: number | undefined
                      firstMatchedWord: number
                      geoDistance: number
                      geoPrecision?: number | undefined
                      matchedGeoLocation?:
                        | {
                            lat?: number | undefined
                            lng?: number | undefined
                            distance?: number | undefined
                          }
                        | undefined
                      personalization?:
                        | {
                            filtersScore?: number | undefined
                            rankingScore?: number | undefined
                            score?: number | undefined
                          }
                        | undefined
                      nbExactWords: number
                      nbTypos: number
                      promoted?: boolean | undefined
                      proximityDistance?: number | undefined
                      userScore: number
                      words?: number | undefined
                      promotedByReRanking?: boolean | undefined
                    }
                  | undefined
                _distinctSeqID?: number | undefined
              }[]
              query: string
              params: string
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { param: { indexName: string } } & {
              json:
                | { params?: string | undefined }
                | {
                    query?: string | undefined
                    similarQuery?: string | undefined
                    filters?: string | undefined
                    facetFilters?: unknown[] | string | undefined
                    optionalFilters?: unknown[] | string | undefined
                    numericFilters?: unknown[] | string | undefined
                    tagFilters?: unknown[] | string | undefined
                    sumOrFiltersScores?: boolean | undefined
                    restrictSearchableAttributes?: string[] | undefined
                    facets?: string[] | undefined
                    facetingAfterDistinct?: boolean | undefined
                    page?: number | undefined
                    offset?: number | undefined
                    length?: number | undefined
                    aroundLatLng?: string | undefined
                    aroundLatLngViaIP?: boolean | undefined
                    aroundRadius?: number | 'all' | undefined
                    aroundPrecision?:
                      | number
                      | { from?: number | undefined; value?: number | undefined }[]
                      | undefined
                    minimumAroundRadius?: number | undefined
                    insideBoundingBox?:
                      | string
                      | ({ [x: string]: unknown } | null)
                      | number[][]
                      | undefined
                    insidePolygon?: number[][] | undefined
                    naturalLanguages?:
                      | (
                          | 'af'
                          | 'ar'
                          | 'az'
                          | 'bg'
                          | 'bn'
                          | 'ca'
                          | 'cs'
                          | 'cy'
                          | 'da'
                          | 'de'
                          | 'el'
                          | 'en'
                          | 'eo'
                          | 'es'
                          | 'et'
                          | 'eu'
                          | 'fa'
                          | 'fi'
                          | 'fo'
                          | 'fr'
                          | 'ga'
                          | 'gl'
                          | 'he'
                          | 'hi'
                          | 'hu'
                          | 'hy'
                          | 'id'
                          | 'is'
                          | 'it'
                          | 'ja'
                          | 'ka'
                          | 'kk'
                          | 'ko'
                          | 'ku'
                          | 'ky'
                          | 'lt'
                          | 'lv'
                          | 'mi'
                          | 'mn'
                          | 'mr'
                          | 'ms'
                          | 'mt'
                          | 'nb'
                          | 'nl'
                          | 'no'
                          | 'ns'
                          | 'pl'
                          | 'ps'
                          | 'pt'
                          | 'pt-br'
                          | 'qu'
                          | 'ro'
                          | 'ru'
                          | 'sk'
                          | 'sq'
                          | 'sv'
                          | 'sw'
                          | 'ta'
                          | 'te'
                          | 'th'
                          | 'tl'
                          | 'tn'
                          | 'tr'
                          | 'tt'
                          | 'uk'
                          | 'ur'
                          | 'uz'
                          | 'zh'
                        )[]
                      | undefined
                    ruleContexts?: string[] | undefined
                    personalizationImpact?: number | undefined
                    userToken?: string | undefined
                    getRankingInfo?: boolean | undefined
                    synonyms?: boolean | undefined
                    clickAnalytics?: boolean | undefined
                    analytics?: boolean | undefined
                    analyticsTags?: string[] | undefined
                    percentileComputation?: boolean | undefined
                    enableABTest?: boolean | undefined
                    attributesToRetrieve?: string[] | undefined
                    ranking?: string[] | undefined
                    relevancyStrictness?: number | undefined
                    attributesToHighlight?: string[] | undefined
                    attributesToSnippet?: string[] | undefined
                    highlightPreTag?: string | undefined
                    highlightPostTag?: string | undefined
                    snippetEllipsisText?: string | undefined
                    restrictHighlightAndSnippetArrays?: boolean | undefined
                    hitsPerPage?: number | undefined
                    minWordSizefor1Typo?: number | undefined
                    minWordSizefor2Typos?: number | undefined
                    typoTolerance?: boolean | 'min' | 'strict' | 'true' | 'false' | undefined
                    allowTyposOnNumericTokens?: boolean | undefined
                    disableTypoToleranceOnAttributes?: string[] | undefined
                    ignorePlurals?:
                      | (
                          | 'af'
                          | 'ar'
                          | 'az'
                          | 'bg'
                          | 'bn'
                          | 'ca'
                          | 'cs'
                          | 'cy'
                          | 'da'
                          | 'de'
                          | 'el'
                          | 'en'
                          | 'eo'
                          | 'es'
                          | 'et'
                          | 'eu'
                          | 'fa'
                          | 'fi'
                          | 'fo'
                          | 'fr'
                          | 'ga'
                          | 'gl'
                          | 'he'
                          | 'hi'
                          | 'hu'
                          | 'hy'
                          | 'id'
                          | 'is'
                          | 'it'
                          | 'ja'
                          | 'ka'
                          | 'kk'
                          | 'ko'
                          | 'ku'
                          | 'ky'
                          | 'lt'
                          | 'lv'
                          | 'mi'
                          | 'mn'
                          | 'mr'
                          | 'ms'
                          | 'mt'
                          | 'nb'
                          | 'nl'
                          | 'no'
                          | 'ns'
                          | 'pl'
                          | 'ps'
                          | 'pt'
                          | 'pt-br'
                          | 'qu'
                          | 'ro'
                          | 'ru'
                          | 'sk'
                          | 'sq'
                          | 'sv'
                          | 'sw'
                          | 'ta'
                          | 'te'
                          | 'th'
                          | 'tl'
                          | 'tn'
                          | 'tr'
                          | 'tt'
                          | 'uk'
                          | 'ur'
                          | 'uz'
                          | 'zh'
                        )[]
                      | 'true'
                      | 'false'
                      | boolean
                      | undefined
                    removeStopWords?:
                      | (
                          | 'af'
                          | 'ar'
                          | 'az'
                          | 'bg'
                          | 'bn'
                          | 'ca'
                          | 'cs'
                          | 'cy'
                          | 'da'
                          | 'de'
                          | 'el'
                          | 'en'
                          | 'eo'
                          | 'es'
                          | 'et'
                          | 'eu'
                          | 'fa'
                          | 'fi'
                          | 'fo'
                          | 'fr'
                          | 'ga'
                          | 'gl'
                          | 'he'
                          | 'hi'
                          | 'hu'
                          | 'hy'
                          | 'id'
                          | 'is'
                          | 'it'
                          | 'ja'
                          | 'ka'
                          | 'kk'
                          | 'ko'
                          | 'ku'
                          | 'ky'
                          | 'lt'
                          | 'lv'
                          | 'mi'
                          | 'mn'
                          | 'mr'
                          | 'ms'
                          | 'mt'
                          | 'nb'
                          | 'nl'
                          | 'no'
                          | 'ns'
                          | 'pl'
                          | 'ps'
                          | 'pt'
                          | 'pt-br'
                          | 'qu'
                          | 'ro'
                          | 'ru'
                          | 'sk'
                          | 'sq'
                          | 'sv'
                          | 'sw'
                          | 'ta'
                          | 'te'
                          | 'th'
                          | 'tl'
                          | 'tn'
                          | 'tr'
                          | 'tt'
                          | 'uk'
                          | 'ur'
                          | 'uz'
                          | 'zh'
                        )[]
                      | boolean
                      | undefined
                    queryLanguages?:
                      | (
                          | 'af'
                          | 'ar'
                          | 'az'
                          | 'bg'
                          | 'bn'
                          | 'ca'
                          | 'cs'
                          | 'cy'
                          | 'da'
                          | 'de'
                          | 'el'
                          | 'en'
                          | 'eo'
                          | 'es'
                          | 'et'
                          | 'eu'
                          | 'fa'
                          | 'fi'
                          | 'fo'
                          | 'fr'
                          | 'ga'
                          | 'gl'
                          | 'he'
                          | 'hi'
                          | 'hu'
                          | 'hy'
                          | 'id'
                          | 'is'
                          | 'it'
                          | 'ja'
                          | 'ka'
                          | 'kk'
                          | 'ko'
                          | 'ku'
                          | 'ky'
                          | 'lt'
                          | 'lv'
                          | 'mi'
                          | 'mn'
                          | 'mr'
                          | 'ms'
                          | 'mt'
                          | 'nb'
                          | 'nl'
                          | 'no'
                          | 'ns'
                          | 'pl'
                          | 'ps'
                          | 'pt'
                          | 'pt-br'
                          | 'qu'
                          | 'ro'
                          | 'ru'
                          | 'sk'
                          | 'sq'
                          | 'sv'
                          | 'sw'
                          | 'ta'
                          | 'te'
                          | 'th'
                          | 'tl'
                          | 'tn'
                          | 'tr'
                          | 'tt'
                          | 'uk'
                          | 'ur'
                          | 'uz'
                          | 'zh'
                        )[]
                      | undefined
                    decompoundQuery?: boolean | undefined
                    enableRules?: boolean | undefined
                    enablePersonalization?: boolean | undefined
                    queryType?: 'prefixLast' | 'prefixAll' | 'prefixNone' | undefined
                    removeWordsIfNoResults?:
                      | 'none'
                      | 'lastWords'
                      | 'firstWords'
                      | 'allOptional'
                      | undefined
                    mode?: 'neuralSearch' | 'keywordSearch' | undefined
                    semanticSearch?:
                      | { eventSources?: string[] | ({ [x: string]: unknown } | null) | undefined }
                      | undefined
                    advancedSyntax?: boolean | undefined
                    optionalWords?:
                      | string
                      | ({ [x: string]: unknown } | null)
                      | string[]
                      | undefined
                    disableExactOnAttributes?: string[] | undefined
                    exactOnSingleWordQuery?: 'attribute' | 'none' | 'word' | undefined
                    alternativesAsExact?:
                      | (
                          | 'ignorePlurals'
                          | 'singleWordSynonym'
                          | 'multiWordsSynonym'
                          | 'ignoreConjugations'
                        )[]
                      | undefined
                    advancedSyntaxFeatures?: ('exactPhrase' | 'excludeWords')[] | undefined
                    distinct?: boolean | number | undefined
                    replaceSynonymsInHighlight?: boolean | undefined
                    minProximity?: number | undefined
                    responseFields?: string[] | undefined
                    maxValuesPerFacet?: number | undefined
                    sortFacetValuesBy?: string | undefined
                    attributeCriteriaComputedByMinProximity?: boolean | undefined
                    renderingContent?:
                      | {
                          facetOrdering?:
                            | {
                                facets?: { order?: string[] | undefined } | undefined
                                values?:
                                  | {
                                      [x: string]: {
                                        order?: string[] | undefined
                                        sortRemainingBy?: 'count' | 'alpha' | 'hidden' | undefined
                                        hide?: string[] | undefined
                                      }
                                    }
                                  | undefined
                              }
                            | undefined
                          redirect?: { url?: string | undefined } | undefined
                          widgets?:
                            | {
                                banners?:
                                  | {
                                      image?:
                                        | {
                                            urls?: { url?: string | undefined }[] | undefined
                                            title?: string | undefined
                                          }
                                        | undefined
                                      link?: { url?: string | undefined } | undefined
                                    }[]
                                  | undefined
                              }
                            | undefined
                        }
                      | undefined
                    enableReRanking?: boolean | undefined
                    reRankingApplyFilter?:
                      | unknown[]
                      | string
                      | ({ [x: string]: unknown } | null)
                      | undefined
                  }
            }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 400
          }
        | {
            input: { param: { indexName: string } } & {
              json:
                | { params?: string | undefined }
                | {
                    query?: string | undefined
                    similarQuery?: string | undefined
                    filters?: string | undefined
                    facetFilters?: unknown[] | string | undefined
                    optionalFilters?: unknown[] | string | undefined
                    numericFilters?: unknown[] | string | undefined
                    tagFilters?: unknown[] | string | undefined
                    sumOrFiltersScores?: boolean | undefined
                    restrictSearchableAttributes?: string[] | undefined
                    facets?: string[] | undefined
                    facetingAfterDistinct?: boolean | undefined
                    page?: number | undefined
                    offset?: number | undefined
                    length?: number | undefined
                    aroundLatLng?: string | undefined
                    aroundLatLngViaIP?: boolean | undefined
                    aroundRadius?: number | 'all' | undefined
                    aroundPrecision?:
                      | number
                      | { from?: number | undefined; value?: number | undefined }[]
                      | undefined
                    minimumAroundRadius?: number | undefined
                    insideBoundingBox?:
                      | string
                      | ({ [x: string]: unknown } | null)
                      | number[][]
                      | undefined
                    insidePolygon?: number[][] | undefined
                    naturalLanguages?:
                      | (
                          | 'af'
                          | 'ar'
                          | 'az'
                          | 'bg'
                          | 'bn'
                          | 'ca'
                          | 'cs'
                          | 'cy'
                          | 'da'
                          | 'de'
                          | 'el'
                          | 'en'
                          | 'eo'
                          | 'es'
                          | 'et'
                          | 'eu'
                          | 'fa'
                          | 'fi'
                          | 'fo'
                          | 'fr'
                          | 'ga'
                          | 'gl'
                          | 'he'
                          | 'hi'
                          | 'hu'
                          | 'hy'
                          | 'id'
                          | 'is'
                          | 'it'
                          | 'ja'
                          | 'ka'
                          | 'kk'
                          | 'ko'
                          | 'ku'
                          | 'ky'
                          | 'lt'
                          | 'lv'
                          | 'mi'
                          | 'mn'
                          | 'mr'
                          | 'ms'
                          | 'mt'
                          | 'nb'
                          | 'nl'
                          | 'no'
                          | 'ns'
                          | 'pl'
                          | 'ps'
                          | 'pt'
                          | 'pt-br'
                          | 'qu'
                          | 'ro'
                          | 'ru'
                          | 'sk'
                          | 'sq'
                          | 'sv'
                          | 'sw'
                          | 'ta'
                          | 'te'
                          | 'th'
                          | 'tl'
                          | 'tn'
                          | 'tr'
                          | 'tt'
                          | 'uk'
                          | 'ur'
                          | 'uz'
                          | 'zh'
                        )[]
                      | undefined
                    ruleContexts?: string[] | undefined
                    personalizationImpact?: number | undefined
                    userToken?: string | undefined
                    getRankingInfo?: boolean | undefined
                    synonyms?: boolean | undefined
                    clickAnalytics?: boolean | undefined
                    analytics?: boolean | undefined
                    analyticsTags?: string[] | undefined
                    percentileComputation?: boolean | undefined
                    enableABTest?: boolean | undefined
                    attributesToRetrieve?: string[] | undefined
                    ranking?: string[] | undefined
                    relevancyStrictness?: number | undefined
                    attributesToHighlight?: string[] | undefined
                    attributesToSnippet?: string[] | undefined
                    highlightPreTag?: string | undefined
                    highlightPostTag?: string | undefined
                    snippetEllipsisText?: string | undefined
                    restrictHighlightAndSnippetArrays?: boolean | undefined
                    hitsPerPage?: number | undefined
                    minWordSizefor1Typo?: number | undefined
                    minWordSizefor2Typos?: number | undefined
                    typoTolerance?: boolean | 'min' | 'strict' | 'true' | 'false' | undefined
                    allowTyposOnNumericTokens?: boolean | undefined
                    disableTypoToleranceOnAttributes?: string[] | undefined
                    ignorePlurals?:
                      | (
                          | 'af'
                          | 'ar'
                          | 'az'
                          | 'bg'
                          | 'bn'
                          | 'ca'
                          | 'cs'
                          | 'cy'
                          | 'da'
                          | 'de'
                          | 'el'
                          | 'en'
                          | 'eo'
                          | 'es'
                          | 'et'
                          | 'eu'
                          | 'fa'
                          | 'fi'
                          | 'fo'
                          | 'fr'
                          | 'ga'
                          | 'gl'
                          | 'he'
                          | 'hi'
                          | 'hu'
                          | 'hy'
                          | 'id'
                          | 'is'
                          | 'it'
                          | 'ja'
                          | 'ka'
                          | 'kk'
                          | 'ko'
                          | 'ku'
                          | 'ky'
                          | 'lt'
                          | 'lv'
                          | 'mi'
                          | 'mn'
                          | 'mr'
                          | 'ms'
                          | 'mt'
                          | 'nb'
                          | 'nl'
                          | 'no'
                          | 'ns'
                          | 'pl'
                          | 'ps'
                          | 'pt'
                          | 'pt-br'
                          | 'qu'
                          | 'ro'
                          | 'ru'
                          | 'sk'
                          | 'sq'
                          | 'sv'
                          | 'sw'
                          | 'ta'
                          | 'te'
                          | 'th'
                          | 'tl'
                          | 'tn'
                          | 'tr'
                          | 'tt'
                          | 'uk'
                          | 'ur'
                          | 'uz'
                          | 'zh'
                        )[]
                      | 'true'
                      | 'false'
                      | boolean
                      | undefined
                    removeStopWords?:
                      | (
                          | 'af'
                          | 'ar'
                          | 'az'
                          | 'bg'
                          | 'bn'
                          | 'ca'
                          | 'cs'
                          | 'cy'
                          | 'da'
                          | 'de'
                          | 'el'
                          | 'en'
                          | 'eo'
                          | 'es'
                          | 'et'
                          | 'eu'
                          | 'fa'
                          | 'fi'
                          | 'fo'
                          | 'fr'
                          | 'ga'
                          | 'gl'
                          | 'he'
                          | 'hi'
                          | 'hu'
                          | 'hy'
                          | 'id'
                          | 'is'
                          | 'it'
                          | 'ja'
                          | 'ka'
                          | 'kk'
                          | 'ko'
                          | 'ku'
                          | 'ky'
                          | 'lt'
                          | 'lv'
                          | 'mi'
                          | 'mn'
                          | 'mr'
                          | 'ms'
                          | 'mt'
                          | 'nb'
                          | 'nl'
                          | 'no'
                          | 'ns'
                          | 'pl'
                          | 'ps'
                          | 'pt'
                          | 'pt-br'
                          | 'qu'
                          | 'ro'
                          | 'ru'
                          | 'sk'
                          | 'sq'
                          | 'sv'
                          | 'sw'
                          | 'ta'
                          | 'te'
                          | 'th'
                          | 'tl'
                          | 'tn'
                          | 'tr'
                          | 'tt'
                          | 'uk'
                          | 'ur'
                          | 'uz'
                          | 'zh'
                        )[]
                      | boolean
                      | undefined
                    queryLanguages?:
                      | (
                          | 'af'
                          | 'ar'
                          | 'az'
                          | 'bg'
                          | 'bn'
                          | 'ca'
                          | 'cs'
                          | 'cy'
                          | 'da'
                          | 'de'
                          | 'el'
                          | 'en'
                          | 'eo'
                          | 'es'
                          | 'et'
                          | 'eu'
                          | 'fa'
                          | 'fi'
                          | 'fo'
                          | 'fr'
                          | 'ga'
                          | 'gl'
                          | 'he'
                          | 'hi'
                          | 'hu'
                          | 'hy'
                          | 'id'
                          | 'is'
                          | 'it'
                          | 'ja'
                          | 'ka'
                          | 'kk'
                          | 'ko'
                          | 'ku'
                          | 'ky'
                          | 'lt'
                          | 'lv'
                          | 'mi'
                          | 'mn'
                          | 'mr'
                          | 'ms'
                          | 'mt'
                          | 'nb'
                          | 'nl'
                          | 'no'
                          | 'ns'
                          | 'pl'
                          | 'ps'
                          | 'pt'
                          | 'pt-br'
                          | 'qu'
                          | 'ro'
                          | 'ru'
                          | 'sk'
                          | 'sq'
                          | 'sv'
                          | 'sw'
                          | 'ta'
                          | 'te'
                          | 'th'
                          | 'tl'
                          | 'tn'
                          | 'tr'
                          | 'tt'
                          | 'uk'
                          | 'ur'
                          | 'uz'
                          | 'zh'
                        )[]
                      | undefined
                    decompoundQuery?: boolean | undefined
                    enableRules?: boolean | undefined
                    enablePersonalization?: boolean | undefined
                    queryType?: 'prefixLast' | 'prefixAll' | 'prefixNone' | undefined
                    removeWordsIfNoResults?:
                      | 'none'
                      | 'lastWords'
                      | 'firstWords'
                      | 'allOptional'
                      | undefined
                    mode?: 'neuralSearch' | 'keywordSearch' | undefined
                    semanticSearch?:
                      | { eventSources?: string[] | ({ [x: string]: unknown } | null) | undefined }
                      | undefined
                    advancedSyntax?: boolean | undefined
                    optionalWords?:
                      | string
                      | ({ [x: string]: unknown } | null)
                      | string[]
                      | undefined
                    disableExactOnAttributes?: string[] | undefined
                    exactOnSingleWordQuery?: 'attribute' | 'none' | 'word' | undefined
                    alternativesAsExact?:
                      | (
                          | 'ignorePlurals'
                          | 'singleWordSynonym'
                          | 'multiWordsSynonym'
                          | 'ignoreConjugations'
                        )[]
                      | undefined
                    advancedSyntaxFeatures?: ('exactPhrase' | 'excludeWords')[] | undefined
                    distinct?: boolean | number | undefined
                    replaceSynonymsInHighlight?: boolean | undefined
                    minProximity?: number | undefined
                    responseFields?: string[] | undefined
                    maxValuesPerFacet?: number | undefined
                    sortFacetValuesBy?: string | undefined
                    attributeCriteriaComputedByMinProximity?: boolean | undefined
                    renderingContent?:
                      | {
                          facetOrdering?:
                            | {
                                facets?: { order?: string[] | undefined } | undefined
                                values?:
                                  | {
                                      [x: string]: {
                                        order?: string[] | undefined
                                        sortRemainingBy?: 'count' | 'alpha' | 'hidden' | undefined
                                        hide?: string[] | undefined
                                      }
                                    }
                                  | undefined
                              }
                            | undefined
                          redirect?: { url?: string | undefined } | undefined
                          widgets?:
                            | {
                                banners?:
                                  | {
                                      image?:
                                        | {
                                            urls?: { url?: string | undefined }[] | undefined
                                            title?: string | undefined
                                          }
                                        | undefined
                                      link?: { url?: string | undefined } | undefined
                                    }[]
                                  | undefined
                              }
                            | undefined
                        }
                      | undefined
                    enableReRanking?: boolean | undefined
                    reRankingApplyFilter?:
                      | unknown[]
                      | string
                      | ({ [x: string]: unknown } | null)
                      | undefined
                  }
            }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 402
          }
        | {
            input: { param: { indexName: string } } & {
              json:
                | { params?: string | undefined }
                | {
                    query?: string | undefined
                    similarQuery?: string | undefined
                    filters?: string | undefined
                    facetFilters?: unknown[] | string | undefined
                    optionalFilters?: unknown[] | string | undefined
                    numericFilters?: unknown[] | string | undefined
                    tagFilters?: unknown[] | string | undefined
                    sumOrFiltersScores?: boolean | undefined
                    restrictSearchableAttributes?: string[] | undefined
                    facets?: string[] | undefined
                    facetingAfterDistinct?: boolean | undefined
                    page?: number | undefined
                    offset?: number | undefined
                    length?: number | undefined
                    aroundLatLng?: string | undefined
                    aroundLatLngViaIP?: boolean | undefined
                    aroundRadius?: number | 'all' | undefined
                    aroundPrecision?:
                      | number
                      | { from?: number | undefined; value?: number | undefined }[]
                      | undefined
                    minimumAroundRadius?: number | undefined
                    insideBoundingBox?:
                      | string
                      | ({ [x: string]: unknown } | null)
                      | number[][]
                      | undefined
                    insidePolygon?: number[][] | undefined
                    naturalLanguages?:
                      | (
                          | 'af'
                          | 'ar'
                          | 'az'
                          | 'bg'
                          | 'bn'
                          | 'ca'
                          | 'cs'
                          | 'cy'
                          | 'da'
                          | 'de'
                          | 'el'
                          | 'en'
                          | 'eo'
                          | 'es'
                          | 'et'
                          | 'eu'
                          | 'fa'
                          | 'fi'
                          | 'fo'
                          | 'fr'
                          | 'ga'
                          | 'gl'
                          | 'he'
                          | 'hi'
                          | 'hu'
                          | 'hy'
                          | 'id'
                          | 'is'
                          | 'it'
                          | 'ja'
                          | 'ka'
                          | 'kk'
                          | 'ko'
                          | 'ku'
                          | 'ky'
                          | 'lt'
                          | 'lv'
                          | 'mi'
                          | 'mn'
                          | 'mr'
                          | 'ms'
                          | 'mt'
                          | 'nb'
                          | 'nl'
                          | 'no'
                          | 'ns'
                          | 'pl'
                          | 'ps'
                          | 'pt'
                          | 'pt-br'
                          | 'qu'
                          | 'ro'
                          | 'ru'
                          | 'sk'
                          | 'sq'
                          | 'sv'
                          | 'sw'
                          | 'ta'
                          | 'te'
                          | 'th'
                          | 'tl'
                          | 'tn'
                          | 'tr'
                          | 'tt'
                          | 'uk'
                          | 'ur'
                          | 'uz'
                          | 'zh'
                        )[]
                      | undefined
                    ruleContexts?: string[] | undefined
                    personalizationImpact?: number | undefined
                    userToken?: string | undefined
                    getRankingInfo?: boolean | undefined
                    synonyms?: boolean | undefined
                    clickAnalytics?: boolean | undefined
                    analytics?: boolean | undefined
                    analyticsTags?: string[] | undefined
                    percentileComputation?: boolean | undefined
                    enableABTest?: boolean | undefined
                    attributesToRetrieve?: string[] | undefined
                    ranking?: string[] | undefined
                    relevancyStrictness?: number | undefined
                    attributesToHighlight?: string[] | undefined
                    attributesToSnippet?: string[] | undefined
                    highlightPreTag?: string | undefined
                    highlightPostTag?: string | undefined
                    snippetEllipsisText?: string | undefined
                    restrictHighlightAndSnippetArrays?: boolean | undefined
                    hitsPerPage?: number | undefined
                    minWordSizefor1Typo?: number | undefined
                    minWordSizefor2Typos?: number | undefined
                    typoTolerance?: boolean | 'min' | 'strict' | 'true' | 'false' | undefined
                    allowTyposOnNumericTokens?: boolean | undefined
                    disableTypoToleranceOnAttributes?: string[] | undefined
                    ignorePlurals?:
                      | (
                          | 'af'
                          | 'ar'
                          | 'az'
                          | 'bg'
                          | 'bn'
                          | 'ca'
                          | 'cs'
                          | 'cy'
                          | 'da'
                          | 'de'
                          | 'el'
                          | 'en'
                          | 'eo'
                          | 'es'
                          | 'et'
                          | 'eu'
                          | 'fa'
                          | 'fi'
                          | 'fo'
                          | 'fr'
                          | 'ga'
                          | 'gl'
                          | 'he'
                          | 'hi'
                          | 'hu'
                          | 'hy'
                          | 'id'
                          | 'is'
                          | 'it'
                          | 'ja'
                          | 'ka'
                          | 'kk'
                          | 'ko'
                          | 'ku'
                          | 'ky'
                          | 'lt'
                          | 'lv'
                          | 'mi'
                          | 'mn'
                          | 'mr'
                          | 'ms'
                          | 'mt'
                          | 'nb'
                          | 'nl'
                          | 'no'
                          | 'ns'
                          | 'pl'
                          | 'ps'
                          | 'pt'
                          | 'pt-br'
                          | 'qu'
                          | 'ro'
                          | 'ru'
                          | 'sk'
                          | 'sq'
                          | 'sv'
                          | 'sw'
                          | 'ta'
                          | 'te'
                          | 'th'
                          | 'tl'
                          | 'tn'
                          | 'tr'
                          | 'tt'
                          | 'uk'
                          | 'ur'
                          | 'uz'
                          | 'zh'
                        )[]
                      | 'true'
                      | 'false'
                      | boolean
                      | undefined
                    removeStopWords?:
                      | (
                          | 'af'
                          | 'ar'
                          | 'az'
                          | 'bg'
                          | 'bn'
                          | 'ca'
                          | 'cs'
                          | 'cy'
                          | 'da'
                          | 'de'
                          | 'el'
                          | 'en'
                          | 'eo'
                          | 'es'
                          | 'et'
                          | 'eu'
                          | 'fa'
                          | 'fi'
                          | 'fo'
                          | 'fr'
                          | 'ga'
                          | 'gl'
                          | 'he'
                          | 'hi'
                          | 'hu'
                          | 'hy'
                          | 'id'
                          | 'is'
                          | 'it'
                          | 'ja'
                          | 'ka'
                          | 'kk'
                          | 'ko'
                          | 'ku'
                          | 'ky'
                          | 'lt'
                          | 'lv'
                          | 'mi'
                          | 'mn'
                          | 'mr'
                          | 'ms'
                          | 'mt'
                          | 'nb'
                          | 'nl'
                          | 'no'
                          | 'ns'
                          | 'pl'
                          | 'ps'
                          | 'pt'
                          | 'pt-br'
                          | 'qu'
                          | 'ro'
                          | 'ru'
                          | 'sk'
                          | 'sq'
                          | 'sv'
                          | 'sw'
                          | 'ta'
                          | 'te'
                          | 'th'
                          | 'tl'
                          | 'tn'
                          | 'tr'
                          | 'tt'
                          | 'uk'
                          | 'ur'
                          | 'uz'
                          | 'zh'
                        )[]
                      | boolean
                      | undefined
                    queryLanguages?:
                      | (
                          | 'af'
                          | 'ar'
                          | 'az'
                          | 'bg'
                          | 'bn'
                          | 'ca'
                          | 'cs'
                          | 'cy'
                          | 'da'
                          | 'de'
                          | 'el'
                          | 'en'
                          | 'eo'
                          | 'es'
                          | 'et'
                          | 'eu'
                          | 'fa'
                          | 'fi'
                          | 'fo'
                          | 'fr'
                          | 'ga'
                          | 'gl'
                          | 'he'
                          | 'hi'
                          | 'hu'
                          | 'hy'
                          | 'id'
                          | 'is'
                          | 'it'
                          | 'ja'
                          | 'ka'
                          | 'kk'
                          | 'ko'
                          | 'ku'
                          | 'ky'
                          | 'lt'
                          | 'lv'
                          | 'mi'
                          | 'mn'
                          | 'mr'
                          | 'ms'
                          | 'mt'
                          | 'nb'
                          | 'nl'
                          | 'no'
                          | 'ns'
                          | 'pl'
                          | 'ps'
                          | 'pt'
                          | 'pt-br'
                          | 'qu'
                          | 'ro'
                          | 'ru'
                          | 'sk'
                          | 'sq'
                          | 'sv'
                          | 'sw'
                          | 'ta'
                          | 'te'
                          | 'th'
                          | 'tl'
                          | 'tn'
                          | 'tr'
                          | 'tt'
                          | 'uk'
                          | 'ur'
                          | 'uz'
                          | 'zh'
                        )[]
                      | undefined
                    decompoundQuery?: boolean | undefined
                    enableRules?: boolean | undefined
                    enablePersonalization?: boolean | undefined
                    queryType?: 'prefixLast' | 'prefixAll' | 'prefixNone' | undefined
                    removeWordsIfNoResults?:
                      | 'none'
                      | 'lastWords'
                      | 'firstWords'
                      | 'allOptional'
                      | undefined
                    mode?: 'neuralSearch' | 'keywordSearch' | undefined
                    semanticSearch?:
                      | { eventSources?: string[] | ({ [x: string]: unknown } | null) | undefined }
                      | undefined
                    advancedSyntax?: boolean | undefined
                    optionalWords?:
                      | string
                      | ({ [x: string]: unknown } | null)
                      | string[]
                      | undefined
                    disableExactOnAttributes?: string[] | undefined
                    exactOnSingleWordQuery?: 'attribute' | 'none' | 'word' | undefined
                    alternativesAsExact?:
                      | (
                          | 'ignorePlurals'
                          | 'singleWordSynonym'
                          | 'multiWordsSynonym'
                          | 'ignoreConjugations'
                        )[]
                      | undefined
                    advancedSyntaxFeatures?: ('exactPhrase' | 'excludeWords')[] | undefined
                    distinct?: boolean | number | undefined
                    replaceSynonymsInHighlight?: boolean | undefined
                    minProximity?: number | undefined
                    responseFields?: string[] | undefined
                    maxValuesPerFacet?: number | undefined
                    sortFacetValuesBy?: string | undefined
                    attributeCriteriaComputedByMinProximity?: boolean | undefined
                    renderingContent?:
                      | {
                          facetOrdering?:
                            | {
                                facets?: { order?: string[] | undefined } | undefined
                                values?:
                                  | {
                                      [x: string]: {
                                        order?: string[] | undefined
                                        sortRemainingBy?: 'count' | 'alpha' | 'hidden' | undefined
                                        hide?: string[] | undefined
                                      }
                                    }
                                  | undefined
                              }
                            | undefined
                          redirect?: { url?: string | undefined } | undefined
                          widgets?:
                            | {
                                banners?:
                                  | {
                                      image?:
                                        | {
                                            urls?: { url?: string | undefined }[] | undefined
                                            title?: string | undefined
                                          }
                                        | undefined
                                      link?: { url?: string | undefined } | undefined
                                    }[]
                                  | undefined
                              }
                            | undefined
                        }
                      | undefined
                    enableReRanking?: boolean | undefined
                    reRankingApplyFilter?:
                      | unknown[]
                      | string
                      | ({ [x: string]: unknown } | null)
                      | undefined
                  }
            }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 403
          }
        | {
            input: { param: { indexName: string } } & {
              json:
                | { params?: string | undefined }
                | {
                    query?: string | undefined
                    similarQuery?: string | undefined
                    filters?: string | undefined
                    facetFilters?: unknown[] | string | undefined
                    optionalFilters?: unknown[] | string | undefined
                    numericFilters?: unknown[] | string | undefined
                    tagFilters?: unknown[] | string | undefined
                    sumOrFiltersScores?: boolean | undefined
                    restrictSearchableAttributes?: string[] | undefined
                    facets?: string[] | undefined
                    facetingAfterDistinct?: boolean | undefined
                    page?: number | undefined
                    offset?: number | undefined
                    length?: number | undefined
                    aroundLatLng?: string | undefined
                    aroundLatLngViaIP?: boolean | undefined
                    aroundRadius?: number | 'all' | undefined
                    aroundPrecision?:
                      | number
                      | { from?: number | undefined; value?: number | undefined }[]
                      | undefined
                    minimumAroundRadius?: number | undefined
                    insideBoundingBox?:
                      | string
                      | ({ [x: string]: unknown } | null)
                      | number[][]
                      | undefined
                    insidePolygon?: number[][] | undefined
                    naturalLanguages?:
                      | (
                          | 'af'
                          | 'ar'
                          | 'az'
                          | 'bg'
                          | 'bn'
                          | 'ca'
                          | 'cs'
                          | 'cy'
                          | 'da'
                          | 'de'
                          | 'el'
                          | 'en'
                          | 'eo'
                          | 'es'
                          | 'et'
                          | 'eu'
                          | 'fa'
                          | 'fi'
                          | 'fo'
                          | 'fr'
                          | 'ga'
                          | 'gl'
                          | 'he'
                          | 'hi'
                          | 'hu'
                          | 'hy'
                          | 'id'
                          | 'is'
                          | 'it'
                          | 'ja'
                          | 'ka'
                          | 'kk'
                          | 'ko'
                          | 'ku'
                          | 'ky'
                          | 'lt'
                          | 'lv'
                          | 'mi'
                          | 'mn'
                          | 'mr'
                          | 'ms'
                          | 'mt'
                          | 'nb'
                          | 'nl'
                          | 'no'
                          | 'ns'
                          | 'pl'
                          | 'ps'
                          | 'pt'
                          | 'pt-br'
                          | 'qu'
                          | 'ro'
                          | 'ru'
                          | 'sk'
                          | 'sq'
                          | 'sv'
                          | 'sw'
                          | 'ta'
                          | 'te'
                          | 'th'
                          | 'tl'
                          | 'tn'
                          | 'tr'
                          | 'tt'
                          | 'uk'
                          | 'ur'
                          | 'uz'
                          | 'zh'
                        )[]
                      | undefined
                    ruleContexts?: string[] | undefined
                    personalizationImpact?: number | undefined
                    userToken?: string | undefined
                    getRankingInfo?: boolean | undefined
                    synonyms?: boolean | undefined
                    clickAnalytics?: boolean | undefined
                    analytics?: boolean | undefined
                    analyticsTags?: string[] | undefined
                    percentileComputation?: boolean | undefined
                    enableABTest?: boolean | undefined
                    attributesToRetrieve?: string[] | undefined
                    ranking?: string[] | undefined
                    relevancyStrictness?: number | undefined
                    attributesToHighlight?: string[] | undefined
                    attributesToSnippet?: string[] | undefined
                    highlightPreTag?: string | undefined
                    highlightPostTag?: string | undefined
                    snippetEllipsisText?: string | undefined
                    restrictHighlightAndSnippetArrays?: boolean | undefined
                    hitsPerPage?: number | undefined
                    minWordSizefor1Typo?: number | undefined
                    minWordSizefor2Typos?: number | undefined
                    typoTolerance?: boolean | 'min' | 'strict' | 'true' | 'false' | undefined
                    allowTyposOnNumericTokens?: boolean | undefined
                    disableTypoToleranceOnAttributes?: string[] | undefined
                    ignorePlurals?:
                      | (
                          | 'af'
                          | 'ar'
                          | 'az'
                          | 'bg'
                          | 'bn'
                          | 'ca'
                          | 'cs'
                          | 'cy'
                          | 'da'
                          | 'de'
                          | 'el'
                          | 'en'
                          | 'eo'
                          | 'es'
                          | 'et'
                          | 'eu'
                          | 'fa'
                          | 'fi'
                          | 'fo'
                          | 'fr'
                          | 'ga'
                          | 'gl'
                          | 'he'
                          | 'hi'
                          | 'hu'
                          | 'hy'
                          | 'id'
                          | 'is'
                          | 'it'
                          | 'ja'
                          | 'ka'
                          | 'kk'
                          | 'ko'
                          | 'ku'
                          | 'ky'
                          | 'lt'
                          | 'lv'
                          | 'mi'
                          | 'mn'
                          | 'mr'
                          | 'ms'
                          | 'mt'
                          | 'nb'
                          | 'nl'
                          | 'no'
                          | 'ns'
                          | 'pl'
                          | 'ps'
                          | 'pt'
                          | 'pt-br'
                          | 'qu'
                          | 'ro'
                          | 'ru'
                          | 'sk'
                          | 'sq'
                          | 'sv'
                          | 'sw'
                          | 'ta'
                          | 'te'
                          | 'th'
                          | 'tl'
                          | 'tn'
                          | 'tr'
                          | 'tt'
                          | 'uk'
                          | 'ur'
                          | 'uz'
                          | 'zh'
                        )[]
                      | 'true'
                      | 'false'
                      | boolean
                      | undefined
                    removeStopWords?:
                      | (
                          | 'af'
                          | 'ar'
                          | 'az'
                          | 'bg'
                          | 'bn'
                          | 'ca'
                          | 'cs'
                          | 'cy'
                          | 'da'
                          | 'de'
                          | 'el'
                          | 'en'
                          | 'eo'
                          | 'es'
                          | 'et'
                          | 'eu'
                          | 'fa'
                          | 'fi'
                          | 'fo'
                          | 'fr'
                          | 'ga'
                          | 'gl'
                          | 'he'
                          | 'hi'
                          | 'hu'
                          | 'hy'
                          | 'id'
                          | 'is'
                          | 'it'
                          | 'ja'
                          | 'ka'
                          | 'kk'
                          | 'ko'
                          | 'ku'
                          | 'ky'
                          | 'lt'
                          | 'lv'
                          | 'mi'
                          | 'mn'
                          | 'mr'
                          | 'ms'
                          | 'mt'
                          | 'nb'
                          | 'nl'
                          | 'no'
                          | 'ns'
                          | 'pl'
                          | 'ps'
                          | 'pt'
                          | 'pt-br'
                          | 'qu'
                          | 'ro'
                          | 'ru'
                          | 'sk'
                          | 'sq'
                          | 'sv'
                          | 'sw'
                          | 'ta'
                          | 'te'
                          | 'th'
                          | 'tl'
                          | 'tn'
                          | 'tr'
                          | 'tt'
                          | 'uk'
                          | 'ur'
                          | 'uz'
                          | 'zh'
                        )[]
                      | boolean
                      | undefined
                    queryLanguages?:
                      | (
                          | 'af'
                          | 'ar'
                          | 'az'
                          | 'bg'
                          | 'bn'
                          | 'ca'
                          | 'cs'
                          | 'cy'
                          | 'da'
                          | 'de'
                          | 'el'
                          | 'en'
                          | 'eo'
                          | 'es'
                          | 'et'
                          | 'eu'
                          | 'fa'
                          | 'fi'
                          | 'fo'
                          | 'fr'
                          | 'ga'
                          | 'gl'
                          | 'he'
                          | 'hi'
                          | 'hu'
                          | 'hy'
                          | 'id'
                          | 'is'
                          | 'it'
                          | 'ja'
                          | 'ka'
                          | 'kk'
                          | 'ko'
                          | 'ku'
                          | 'ky'
                          | 'lt'
                          | 'lv'
                          | 'mi'
                          | 'mn'
                          | 'mr'
                          | 'ms'
                          | 'mt'
                          | 'nb'
                          | 'nl'
                          | 'no'
                          | 'ns'
                          | 'pl'
                          | 'ps'
                          | 'pt'
                          | 'pt-br'
                          | 'qu'
                          | 'ro'
                          | 'ru'
                          | 'sk'
                          | 'sq'
                          | 'sv'
                          | 'sw'
                          | 'ta'
                          | 'te'
                          | 'th'
                          | 'tl'
                          | 'tn'
                          | 'tr'
                          | 'tt'
                          | 'uk'
                          | 'ur'
                          | 'uz'
                          | 'zh'
                        )[]
                      | undefined
                    decompoundQuery?: boolean | undefined
                    enableRules?: boolean | undefined
                    enablePersonalization?: boolean | undefined
                    queryType?: 'prefixLast' | 'prefixAll' | 'prefixNone' | undefined
                    removeWordsIfNoResults?:
                      | 'none'
                      | 'lastWords'
                      | 'firstWords'
                      | 'allOptional'
                      | undefined
                    mode?: 'neuralSearch' | 'keywordSearch' | undefined
                    semanticSearch?:
                      | { eventSources?: string[] | ({ [x: string]: unknown } | null) | undefined }
                      | undefined
                    advancedSyntax?: boolean | undefined
                    optionalWords?:
                      | string
                      | ({ [x: string]: unknown } | null)
                      | string[]
                      | undefined
                    disableExactOnAttributes?: string[] | undefined
                    exactOnSingleWordQuery?: 'attribute' | 'none' | 'word' | undefined
                    alternativesAsExact?:
                      | (
                          | 'ignorePlurals'
                          | 'singleWordSynonym'
                          | 'multiWordsSynonym'
                          | 'ignoreConjugations'
                        )[]
                      | undefined
                    advancedSyntaxFeatures?: ('exactPhrase' | 'excludeWords')[] | undefined
                    distinct?: boolean | number | undefined
                    replaceSynonymsInHighlight?: boolean | undefined
                    minProximity?: number | undefined
                    responseFields?: string[] | undefined
                    maxValuesPerFacet?: number | undefined
                    sortFacetValuesBy?: string | undefined
                    attributeCriteriaComputedByMinProximity?: boolean | undefined
                    renderingContent?:
                      | {
                          facetOrdering?:
                            | {
                                facets?: { order?: string[] | undefined } | undefined
                                values?:
                                  | {
                                      [x: string]: {
                                        order?: string[] | undefined
                                        sortRemainingBy?: 'count' | 'alpha' | 'hidden' | undefined
                                        hide?: string[] | undefined
                                      }
                                    }
                                  | undefined
                              }
                            | undefined
                          redirect?: { url?: string | undefined } | undefined
                          widgets?:
                            | {
                                banners?:
                                  | {
                                      image?:
                                        | {
                                            urls?: { url?: string | undefined }[] | undefined
                                            title?: string | undefined
                                          }
                                        | undefined
                                      link?: { url?: string | undefined } | undefined
                                    }[]
                                  | undefined
                              }
                            | undefined
                        }
                      | undefined
                    enableReRanking?: boolean | undefined
                    reRankingApplyFilter?:
                      | unknown[]
                      | string
                      | ({ [x: string]: unknown } | null)
                      | undefined
                  }
            }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 404
          }
    }
  } & {
    '/1/indexes/*/queries': {
      $post:
        | {
            input: {
              json: {
                requests: (
                  | { indexName: string; type?: 'default' | undefined }
                  | {
                      facet: string
                      indexName: string
                      facetQuery?: string | undefined
                      maxFacetHits?: number | undefined
                      type: 'facet'
                    }
                )[]
                strategy?: 'none' | 'stopIfEnoughMatches' | undefined
              }
            }
            output: {
              results: (
                | {
                    abTestID?: number | undefined
                    abTestVariantID?: number | undefined
                    aroundLatLng?: string | undefined
                    automaticRadius?: string | undefined
                    exhaustive?:
                      | {
                          facetsCount?: boolean | undefined
                          facetValues?: boolean | undefined
                          nbHits?: boolean | undefined
                          rulesMatch?: boolean | undefined
                          typo?: boolean | undefined
                        }
                      | undefined
                    appliedRules?: { [x: string]: unknown }[] | undefined
                    exhaustiveFacetsCount?: boolean | undefined
                    exhaustiveNbHits?: boolean | undefined
                    exhaustiveTypo?: boolean | undefined
                    facets?: { [x: string]: { [x: string]: number } } | undefined
                    facets_stats?:
                      | {
                          [x: string]: {
                            min?: number | undefined
                            max?: number | undefined
                            avg?: number | undefined
                            sum?: number | undefined
                          }
                        }
                      | undefined
                    index?: string | undefined
                    indexUsed?: string | undefined
                    message?: string | undefined
                    nbSortedHits?: number | undefined
                    parsedQuery?: string | undefined
                    processingTimeMS?: number | undefined
                    processingTimingsMS?: { [x: string]: unknown } | undefined
                    queryAfterRemoval?: string | undefined
                    redirect?:
                      | {
                          index?:
                            | {
                                source: string
                                dest: string
                                reason: string
                                succeed: boolean
                                data: { ruleObjectID: string }
                              }[]
                            | undefined
                        }
                      | undefined
                    renderingContent?:
                      | {
                          facetOrdering?:
                            | {
                                facets?: { order?: string[] | undefined } | undefined
                                values?:
                                  | {
                                      [x: string]: {
                                        order?: string[] | undefined
                                        sortRemainingBy?: 'count' | 'alpha' | 'hidden' | undefined
                                        hide?: string[] | undefined
                                      }
                                    }
                                  | undefined
                              }
                            | undefined
                          redirect?: { url?: string | undefined } | undefined
                          widgets?:
                            | {
                                banners?:
                                  | {
                                      image?:
                                        | {
                                            urls?: { url?: string | undefined }[] | undefined
                                            title?: string | undefined
                                          }
                                        | undefined
                                      link?: { url?: string | undefined } | undefined
                                    }[]
                                  | undefined
                              }
                            | undefined
                        }
                      | undefined
                    serverTimeMS?: number | undefined
                    serverUsed?: string | undefined
                    userData?: { [x: string]: unknown } | undefined
                    queryID?: string | undefined
                    _automaticInsights?: boolean | undefined
                    page?: number | undefined
                    nbHits?: number | undefined
                    nbPages?: number | undefined
                    hitsPerPage?: number | undefined
                    hits: {
                      objectID: string
                      _highlightResult?:
                        | {
                            [x: string]:
                              | {
                                  value: string
                                  matchLevel: 'none' | 'partial' | 'full'
                                  matchedWords: string[]
                                  fullyHighlighted?: boolean | undefined
                                }
                              | unknown
                              | unknown[]
                          }
                        | undefined
                      _snippetResult?:
                        | {
                            [x: string]:
                              | { value: string; matchLevel: 'none' | 'partial' | 'full' }
                              | unknown
                              | unknown[]
                          }
                        | undefined
                      _rankingInfo?:
                        | {
                            filters?: number | undefined
                            firstMatchedWord: number
                            geoDistance: number
                            geoPrecision?: number | undefined
                            matchedGeoLocation?:
                              | {
                                  lat?: number | undefined
                                  lng?: number | undefined
                                  distance?: number | undefined
                                }
                              | undefined
                            personalization?:
                              | {
                                  filtersScore?: number | undefined
                                  rankingScore?: number | undefined
                                  score?: number | undefined
                                }
                              | undefined
                            nbExactWords: number
                            nbTypos: number
                            promoted?: boolean | undefined
                            proximityDistance?: number | undefined
                            userScore: number
                            words?: number | undefined
                            promotedByReRanking?: boolean | undefined
                          }
                        | undefined
                      _distinctSeqID?: number | undefined
                    }[]
                    query: string
                    params: string
                  }
                | {
                    facetHits: { value: string; highlighted: string; count: number }[]
                    exhaustiveFacetsCount: boolean
                    processingTimeMS?: number | undefined
                  }
              )[]
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: {
              json: {
                requests: (
                  | { indexName: string; type?: 'default' | undefined }
                  | {
                      facet: string
                      indexName: string
                      facetQuery?: string | undefined
                      maxFacetHits?: number | undefined
                      type: 'facet'
                    }
                )[]
                strategy?: 'none' | 'stopIfEnoughMatches' | undefined
              }
            }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 400
          }
        | {
            input: {
              json: {
                requests: (
                  | { indexName: string; type?: 'default' | undefined }
                  | {
                      facet: string
                      indexName: string
                      facetQuery?: string | undefined
                      maxFacetHits?: number | undefined
                      type: 'facet'
                    }
                )[]
                strategy?: 'none' | 'stopIfEnoughMatches' | undefined
              }
            }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 402
          }
        | {
            input: {
              json: {
                requests: (
                  | { indexName: string; type?: 'default' | undefined }
                  | {
                      facet: string
                      indexName: string
                      facetQuery?: string | undefined
                      maxFacetHits?: number | undefined
                      type: 'facet'
                    }
                )[]
                strategy?: 'none' | 'stopIfEnoughMatches' | undefined
              }
            }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 403
          }
        | {
            input: {
              json: {
                requests: (
                  | { indexName: string; type?: 'default' | undefined }
                  | {
                      facet: string
                      indexName: string
                      facetQuery?: string | undefined
                      maxFacetHits?: number | undefined
                      type: 'facet'
                    }
                )[]
                strategy?: 'none' | 'stopIfEnoughMatches' | undefined
              }
            }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 404
          }
    }
  } & {
    '/1/indexes/:indexName/facets/:facetName/query': {
      $post:
        | {
            input: { param: { indexName: string; facetName: string } } & {
              json: {
                params?: string | undefined
                facetQuery?: string | undefined
                maxFacetHits?: number | undefined
              }
            }
            output: {
              facetHits: { value: string; highlighted: string; count: number }[]
              exhaustiveFacetsCount: boolean
              processingTimeMS?: number | undefined
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { param: { indexName: string; facetName: string } } & {
              json: {
                params?: string | undefined
                facetQuery?: string | undefined
                maxFacetHits?: number | undefined
              }
            }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 400
          }
        | {
            input: { param: { indexName: string; facetName: string } } & {
              json: {
                params?: string | undefined
                facetQuery?: string | undefined
                maxFacetHits?: number | undefined
              }
            }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 402
          }
        | {
            input: { param: { indexName: string; facetName: string } } & {
              json: {
                params?: string | undefined
                facetQuery?: string | undefined
                maxFacetHits?: number | undefined
              }
            }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 403
          }
        | {
            input: { param: { indexName: string; facetName: string } } & {
              json: {
                params?: string | undefined
                facetQuery?: string | undefined
                maxFacetHits?: number | undefined
              }
            }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 404
          }
    }
  } & {
    '/1/indexes/:indexName/browse': {
      $post:
        | {
            input: { param: { indexName: string } } & {
              json:
                | {
                    query?: string | undefined
                    similarQuery?: string | undefined
                    filters?: string | undefined
                    facetFilters?: unknown[] | string | undefined
                    optionalFilters?: unknown[] | string | undefined
                    numericFilters?: unknown[] | string | undefined
                    tagFilters?: unknown[] | string | undefined
                    sumOrFiltersScores?: boolean | undefined
                    restrictSearchableAttributes?: string[] | undefined
                    facets?: string[] | undefined
                    facetingAfterDistinct?: boolean | undefined
                    page?: number | undefined
                    offset?: number | undefined
                    length?: number | undefined
                    aroundLatLng?: string | undefined
                    aroundLatLngViaIP?: boolean | undefined
                    aroundRadius?: number | 'all' | undefined
                    aroundPrecision?:
                      | number
                      | { from?: number | undefined; value?: number | undefined }[]
                      | undefined
                    minimumAroundRadius?: number | undefined
                    insideBoundingBox?:
                      | string
                      | ({ [x: string]: unknown } | null)
                      | number[][]
                      | undefined
                    insidePolygon?: number[][] | undefined
                    naturalLanguages?:
                      | (
                          | 'af'
                          | 'ar'
                          | 'az'
                          | 'bg'
                          | 'bn'
                          | 'ca'
                          | 'cs'
                          | 'cy'
                          | 'da'
                          | 'de'
                          | 'el'
                          | 'en'
                          | 'eo'
                          | 'es'
                          | 'et'
                          | 'eu'
                          | 'fa'
                          | 'fi'
                          | 'fo'
                          | 'fr'
                          | 'ga'
                          | 'gl'
                          | 'he'
                          | 'hi'
                          | 'hu'
                          | 'hy'
                          | 'id'
                          | 'is'
                          | 'it'
                          | 'ja'
                          | 'ka'
                          | 'kk'
                          | 'ko'
                          | 'ku'
                          | 'ky'
                          | 'lt'
                          | 'lv'
                          | 'mi'
                          | 'mn'
                          | 'mr'
                          | 'ms'
                          | 'mt'
                          | 'nb'
                          | 'nl'
                          | 'no'
                          | 'ns'
                          | 'pl'
                          | 'ps'
                          | 'pt'
                          | 'pt-br'
                          | 'qu'
                          | 'ro'
                          | 'ru'
                          | 'sk'
                          | 'sq'
                          | 'sv'
                          | 'sw'
                          | 'ta'
                          | 'te'
                          | 'th'
                          | 'tl'
                          | 'tn'
                          | 'tr'
                          | 'tt'
                          | 'uk'
                          | 'ur'
                          | 'uz'
                          | 'zh'
                        )[]
                      | undefined
                    ruleContexts?: string[] | undefined
                    personalizationImpact?: number | undefined
                    userToken?: string | undefined
                    getRankingInfo?: boolean | undefined
                    synonyms?: boolean | undefined
                    clickAnalytics?: boolean | undefined
                    analytics?: boolean | undefined
                    analyticsTags?: string[] | undefined
                    percentileComputation?: boolean | undefined
                    enableABTest?: boolean | undefined
                    attributesToRetrieve?: string[] | undefined
                    ranking?: string[] | undefined
                    relevancyStrictness?: number | undefined
                    attributesToHighlight?: string[] | undefined
                    attributesToSnippet?: string[] | undefined
                    highlightPreTag?: string | undefined
                    highlightPostTag?: string | undefined
                    snippetEllipsisText?: string | undefined
                    restrictHighlightAndSnippetArrays?: boolean | undefined
                    hitsPerPage?: number | undefined
                    minWordSizefor1Typo?: number | undefined
                    minWordSizefor2Typos?: number | undefined
                    typoTolerance?: boolean | 'min' | 'strict' | 'true' | 'false' | undefined
                    allowTyposOnNumericTokens?: boolean | undefined
                    disableTypoToleranceOnAttributes?: string[] | undefined
                    ignorePlurals?:
                      | (
                          | 'af'
                          | 'ar'
                          | 'az'
                          | 'bg'
                          | 'bn'
                          | 'ca'
                          | 'cs'
                          | 'cy'
                          | 'da'
                          | 'de'
                          | 'el'
                          | 'en'
                          | 'eo'
                          | 'es'
                          | 'et'
                          | 'eu'
                          | 'fa'
                          | 'fi'
                          | 'fo'
                          | 'fr'
                          | 'ga'
                          | 'gl'
                          | 'he'
                          | 'hi'
                          | 'hu'
                          | 'hy'
                          | 'id'
                          | 'is'
                          | 'it'
                          | 'ja'
                          | 'ka'
                          | 'kk'
                          | 'ko'
                          | 'ku'
                          | 'ky'
                          | 'lt'
                          | 'lv'
                          | 'mi'
                          | 'mn'
                          | 'mr'
                          | 'ms'
                          | 'mt'
                          | 'nb'
                          | 'nl'
                          | 'no'
                          | 'ns'
                          | 'pl'
                          | 'ps'
                          | 'pt'
                          | 'pt-br'
                          | 'qu'
                          | 'ro'
                          | 'ru'
                          | 'sk'
                          | 'sq'
                          | 'sv'
                          | 'sw'
                          | 'ta'
                          | 'te'
                          | 'th'
                          | 'tl'
                          | 'tn'
                          | 'tr'
                          | 'tt'
                          | 'uk'
                          | 'ur'
                          | 'uz'
                          | 'zh'
                        )[]
                      | 'true'
                      | 'false'
                      | boolean
                      | undefined
                    removeStopWords?:
                      | (
                          | 'af'
                          | 'ar'
                          | 'az'
                          | 'bg'
                          | 'bn'
                          | 'ca'
                          | 'cs'
                          | 'cy'
                          | 'da'
                          | 'de'
                          | 'el'
                          | 'en'
                          | 'eo'
                          | 'es'
                          | 'et'
                          | 'eu'
                          | 'fa'
                          | 'fi'
                          | 'fo'
                          | 'fr'
                          | 'ga'
                          | 'gl'
                          | 'he'
                          | 'hi'
                          | 'hu'
                          | 'hy'
                          | 'id'
                          | 'is'
                          | 'it'
                          | 'ja'
                          | 'ka'
                          | 'kk'
                          | 'ko'
                          | 'ku'
                          | 'ky'
                          | 'lt'
                          | 'lv'
                          | 'mi'
                          | 'mn'
                          | 'mr'
                          | 'ms'
                          | 'mt'
                          | 'nb'
                          | 'nl'
                          | 'no'
                          | 'ns'
                          | 'pl'
                          | 'ps'
                          | 'pt'
                          | 'pt-br'
                          | 'qu'
                          | 'ro'
                          | 'ru'
                          | 'sk'
                          | 'sq'
                          | 'sv'
                          | 'sw'
                          | 'ta'
                          | 'te'
                          | 'th'
                          | 'tl'
                          | 'tn'
                          | 'tr'
                          | 'tt'
                          | 'uk'
                          | 'ur'
                          | 'uz'
                          | 'zh'
                        )[]
                      | boolean
                      | undefined
                    queryLanguages?:
                      | (
                          | 'af'
                          | 'ar'
                          | 'az'
                          | 'bg'
                          | 'bn'
                          | 'ca'
                          | 'cs'
                          | 'cy'
                          | 'da'
                          | 'de'
                          | 'el'
                          | 'en'
                          | 'eo'
                          | 'es'
                          | 'et'
                          | 'eu'
                          | 'fa'
                          | 'fi'
                          | 'fo'
                          | 'fr'
                          | 'ga'
                          | 'gl'
                          | 'he'
                          | 'hi'
                          | 'hu'
                          | 'hy'
                          | 'id'
                          | 'is'
                          | 'it'
                          | 'ja'
                          | 'ka'
                          | 'kk'
                          | 'ko'
                          | 'ku'
                          | 'ky'
                          | 'lt'
                          | 'lv'
                          | 'mi'
                          | 'mn'
                          | 'mr'
                          | 'ms'
                          | 'mt'
                          | 'nb'
                          | 'nl'
                          | 'no'
                          | 'ns'
                          | 'pl'
                          | 'ps'
                          | 'pt'
                          | 'pt-br'
                          | 'qu'
                          | 'ro'
                          | 'ru'
                          | 'sk'
                          | 'sq'
                          | 'sv'
                          | 'sw'
                          | 'ta'
                          | 'te'
                          | 'th'
                          | 'tl'
                          | 'tn'
                          | 'tr'
                          | 'tt'
                          | 'uk'
                          | 'ur'
                          | 'uz'
                          | 'zh'
                        )[]
                      | undefined
                    decompoundQuery?: boolean | undefined
                    enableRules?: boolean | undefined
                    enablePersonalization?: boolean | undefined
                    queryType?: 'prefixLast' | 'prefixAll' | 'prefixNone' | undefined
                    removeWordsIfNoResults?:
                      | 'none'
                      | 'lastWords'
                      | 'firstWords'
                      | 'allOptional'
                      | undefined
                    mode?: 'neuralSearch' | 'keywordSearch' | undefined
                    semanticSearch?:
                      | { eventSources?: string[] | ({ [x: string]: unknown } | null) | undefined }
                      | undefined
                    advancedSyntax?: boolean | undefined
                    optionalWords?:
                      | string
                      | ({ [x: string]: unknown } | null)
                      | string[]
                      | undefined
                    disableExactOnAttributes?: string[] | undefined
                    exactOnSingleWordQuery?: 'attribute' | 'none' | 'word' | undefined
                    alternativesAsExact?:
                      | (
                          | 'ignorePlurals'
                          | 'singleWordSynonym'
                          | 'multiWordsSynonym'
                          | 'ignoreConjugations'
                        )[]
                      | undefined
                    advancedSyntaxFeatures?: ('exactPhrase' | 'excludeWords')[] | undefined
                    distinct?: boolean | number | undefined
                    replaceSynonymsInHighlight?: boolean | undefined
                    minProximity?: number | undefined
                    responseFields?: string[] | undefined
                    maxValuesPerFacet?: number | undefined
                    sortFacetValuesBy?: string | undefined
                    attributeCriteriaComputedByMinProximity?: boolean | undefined
                    renderingContent?:
                      | {
                          facetOrdering?:
                            | {
                                facets?: { order?: string[] | undefined } | undefined
                                values?:
                                  | {
                                      [x: string]: {
                                        order?: string[] | undefined
                                        sortRemainingBy?: 'count' | 'alpha' | 'hidden' | undefined
                                        hide?: string[] | undefined
                                      }
                                    }
                                  | undefined
                              }
                            | undefined
                          redirect?: { url?: string | undefined } | undefined
                          widgets?:
                            | {
                                banners?:
                                  | {
                                      image?:
                                        | {
                                            urls?: { url?: string | undefined }[] | undefined
                                            title?: string | undefined
                                          }
                                        | undefined
                                      link?: { url?: string | undefined } | undefined
                                    }[]
                                  | undefined
                              }
                            | undefined
                        }
                      | undefined
                    enableReRanking?: boolean | undefined
                    reRankingApplyFilter?:
                      | unknown[]
                      | string
                      | ({ [x: string]: unknown } | null)
                      | undefined
                    cursor?: string | undefined
                  }
                | { params?: string | undefined }
            }
            output: {
              abTestID?: number | undefined
              abTestVariantID?: number | undefined
              aroundLatLng?: string | undefined
              automaticRadius?: string | undefined
              exhaustive?:
                | {
                    facetsCount?: boolean | undefined
                    facetValues?: boolean | undefined
                    nbHits?: boolean | undefined
                    rulesMatch?: boolean | undefined
                    typo?: boolean | undefined
                  }
                | undefined
              appliedRules?: { [x: string]: unknown }[] | undefined
              exhaustiveFacetsCount?: boolean | undefined
              exhaustiveNbHits?: boolean | undefined
              exhaustiveTypo?: boolean | undefined
              facets?: { [x: string]: { [x: string]: number } } | undefined
              facets_stats?:
                | {
                    [x: string]: {
                      min?: number | undefined
                      max?: number | undefined
                      avg?: number | undefined
                      sum?: number | undefined
                    }
                  }
                | undefined
              index?: string | undefined
              indexUsed?: string | undefined
              message?: string | undefined
              nbSortedHits?: number | undefined
              parsedQuery?: string | undefined
              processingTimeMS?: number | undefined
              processingTimingsMS?: { [x: string]: unknown } | undefined
              queryAfterRemoval?: string | undefined
              redirect?:
                | {
                    index?:
                      | {
                          source: string
                          dest: string
                          reason: string
                          succeed: boolean
                          data: { ruleObjectID: string }
                        }[]
                      | undefined
                  }
                | undefined
              renderingContent?:
                | {
                    facetOrdering?:
                      | {
                          facets?: { order?: string[] | undefined } | undefined
                          values?:
                            | {
                                [x: string]: {
                                  order?: string[] | undefined
                                  sortRemainingBy?: 'count' | 'alpha' | 'hidden' | undefined
                                  hide?: string[] | undefined
                                }
                              }
                            | undefined
                        }
                      | undefined
                    redirect?: { url?: string | undefined } | undefined
                    widgets?:
                      | {
                          banners?:
                            | {
                                image?:
                                  | {
                                      urls?: { url?: string | undefined }[] | undefined
                                      title?: string | undefined
                                    }
                                  | undefined
                                link?: { url?: string | undefined } | undefined
                              }[]
                            | undefined
                        }
                      | undefined
                  }
                | undefined
              serverTimeMS?: number | undefined
              serverUsed?: string | undefined
              userData?: { [x: string]: unknown } | undefined
              queryID?: string | undefined
              _automaticInsights?: boolean | undefined
              page?: number | undefined
              nbHits?: number | undefined
              nbPages?: number | undefined
              hitsPerPage?: number | undefined
              hits: {
                objectID: string
                _highlightResult?:
                  | {
                      [x: string]:
                        | {
                            value: string
                            matchLevel: 'none' | 'partial' | 'full'
                            matchedWords: string[]
                            fullyHighlighted?: boolean | undefined
                          }
                        | unknown
                        | unknown[]
                    }
                  | undefined
                _snippetResult?:
                  | {
                      [x: string]:
                        | { value: string; matchLevel: 'none' | 'partial' | 'full' }
                        | unknown
                        | unknown[]
                    }
                  | undefined
                _rankingInfo?:
                  | {
                      filters?: number | undefined
                      firstMatchedWord: number
                      geoDistance: number
                      geoPrecision?: number | undefined
                      matchedGeoLocation?:
                        | {
                            lat?: number | undefined
                            lng?: number | undefined
                            distance?: number | undefined
                          }
                        | undefined
                      personalization?:
                        | {
                            filtersScore?: number | undefined
                            rankingScore?: number | undefined
                            score?: number | undefined
                          }
                        | undefined
                      nbExactWords: number
                      nbTypos: number
                      promoted?: boolean | undefined
                      proximityDistance?: number | undefined
                      userScore: number
                      words?: number | undefined
                      promotedByReRanking?: boolean | undefined
                    }
                  | undefined
                _distinctSeqID?: number | undefined
              }[]
              query: string
              params: string
              cursor?: string | undefined
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { param: { indexName: string } } & {
              json:
                | {
                    query?: string | undefined
                    similarQuery?: string | undefined
                    filters?: string | undefined
                    facetFilters?: unknown[] | string | undefined
                    optionalFilters?: unknown[] | string | undefined
                    numericFilters?: unknown[] | string | undefined
                    tagFilters?: unknown[] | string | undefined
                    sumOrFiltersScores?: boolean | undefined
                    restrictSearchableAttributes?: string[] | undefined
                    facets?: string[] | undefined
                    facetingAfterDistinct?: boolean | undefined
                    page?: number | undefined
                    offset?: number | undefined
                    length?: number | undefined
                    aroundLatLng?: string | undefined
                    aroundLatLngViaIP?: boolean | undefined
                    aroundRadius?: number | 'all' | undefined
                    aroundPrecision?:
                      | number
                      | { from?: number | undefined; value?: number | undefined }[]
                      | undefined
                    minimumAroundRadius?: number | undefined
                    insideBoundingBox?:
                      | string
                      | ({ [x: string]: unknown } | null)
                      | number[][]
                      | undefined
                    insidePolygon?: number[][] | undefined
                    naturalLanguages?:
                      | (
                          | 'af'
                          | 'ar'
                          | 'az'
                          | 'bg'
                          | 'bn'
                          | 'ca'
                          | 'cs'
                          | 'cy'
                          | 'da'
                          | 'de'
                          | 'el'
                          | 'en'
                          | 'eo'
                          | 'es'
                          | 'et'
                          | 'eu'
                          | 'fa'
                          | 'fi'
                          | 'fo'
                          | 'fr'
                          | 'ga'
                          | 'gl'
                          | 'he'
                          | 'hi'
                          | 'hu'
                          | 'hy'
                          | 'id'
                          | 'is'
                          | 'it'
                          | 'ja'
                          | 'ka'
                          | 'kk'
                          | 'ko'
                          | 'ku'
                          | 'ky'
                          | 'lt'
                          | 'lv'
                          | 'mi'
                          | 'mn'
                          | 'mr'
                          | 'ms'
                          | 'mt'
                          | 'nb'
                          | 'nl'
                          | 'no'
                          | 'ns'
                          | 'pl'
                          | 'ps'
                          | 'pt'
                          | 'pt-br'
                          | 'qu'
                          | 'ro'
                          | 'ru'
                          | 'sk'
                          | 'sq'
                          | 'sv'
                          | 'sw'
                          | 'ta'
                          | 'te'
                          | 'th'
                          | 'tl'
                          | 'tn'
                          | 'tr'
                          | 'tt'
                          | 'uk'
                          | 'ur'
                          | 'uz'
                          | 'zh'
                        )[]
                      | undefined
                    ruleContexts?: string[] | undefined
                    personalizationImpact?: number | undefined
                    userToken?: string | undefined
                    getRankingInfo?: boolean | undefined
                    synonyms?: boolean | undefined
                    clickAnalytics?: boolean | undefined
                    analytics?: boolean | undefined
                    analyticsTags?: string[] | undefined
                    percentileComputation?: boolean | undefined
                    enableABTest?: boolean | undefined
                    attributesToRetrieve?: string[] | undefined
                    ranking?: string[] | undefined
                    relevancyStrictness?: number | undefined
                    attributesToHighlight?: string[] | undefined
                    attributesToSnippet?: string[] | undefined
                    highlightPreTag?: string | undefined
                    highlightPostTag?: string | undefined
                    snippetEllipsisText?: string | undefined
                    restrictHighlightAndSnippetArrays?: boolean | undefined
                    hitsPerPage?: number | undefined
                    minWordSizefor1Typo?: number | undefined
                    minWordSizefor2Typos?: number | undefined
                    typoTolerance?: boolean | 'min' | 'strict' | 'true' | 'false' | undefined
                    allowTyposOnNumericTokens?: boolean | undefined
                    disableTypoToleranceOnAttributes?: string[] | undefined
                    ignorePlurals?:
                      | (
                          | 'af'
                          | 'ar'
                          | 'az'
                          | 'bg'
                          | 'bn'
                          | 'ca'
                          | 'cs'
                          | 'cy'
                          | 'da'
                          | 'de'
                          | 'el'
                          | 'en'
                          | 'eo'
                          | 'es'
                          | 'et'
                          | 'eu'
                          | 'fa'
                          | 'fi'
                          | 'fo'
                          | 'fr'
                          | 'ga'
                          | 'gl'
                          | 'he'
                          | 'hi'
                          | 'hu'
                          | 'hy'
                          | 'id'
                          | 'is'
                          | 'it'
                          | 'ja'
                          | 'ka'
                          | 'kk'
                          | 'ko'
                          | 'ku'
                          | 'ky'
                          | 'lt'
                          | 'lv'
                          | 'mi'
                          | 'mn'
                          | 'mr'
                          | 'ms'
                          | 'mt'
                          | 'nb'
                          | 'nl'
                          | 'no'
                          | 'ns'
                          | 'pl'
                          | 'ps'
                          | 'pt'
                          | 'pt-br'
                          | 'qu'
                          | 'ro'
                          | 'ru'
                          | 'sk'
                          | 'sq'
                          | 'sv'
                          | 'sw'
                          | 'ta'
                          | 'te'
                          | 'th'
                          | 'tl'
                          | 'tn'
                          | 'tr'
                          | 'tt'
                          | 'uk'
                          | 'ur'
                          | 'uz'
                          | 'zh'
                        )[]
                      | 'true'
                      | 'false'
                      | boolean
                      | undefined
                    removeStopWords?:
                      | (
                          | 'af'
                          | 'ar'
                          | 'az'
                          | 'bg'
                          | 'bn'
                          | 'ca'
                          | 'cs'
                          | 'cy'
                          | 'da'
                          | 'de'
                          | 'el'
                          | 'en'
                          | 'eo'
                          | 'es'
                          | 'et'
                          | 'eu'
                          | 'fa'
                          | 'fi'
                          | 'fo'
                          | 'fr'
                          | 'ga'
                          | 'gl'
                          | 'he'
                          | 'hi'
                          | 'hu'
                          | 'hy'
                          | 'id'
                          | 'is'
                          | 'it'
                          | 'ja'
                          | 'ka'
                          | 'kk'
                          | 'ko'
                          | 'ku'
                          | 'ky'
                          | 'lt'
                          | 'lv'
                          | 'mi'
                          | 'mn'
                          | 'mr'
                          | 'ms'
                          | 'mt'
                          | 'nb'
                          | 'nl'
                          | 'no'
                          | 'ns'
                          | 'pl'
                          | 'ps'
                          | 'pt'
                          | 'pt-br'
                          | 'qu'
                          | 'ro'
                          | 'ru'
                          | 'sk'
                          | 'sq'
                          | 'sv'
                          | 'sw'
                          | 'ta'
                          | 'te'
                          | 'th'
                          | 'tl'
                          | 'tn'
                          | 'tr'
                          | 'tt'
                          | 'uk'
                          | 'ur'
                          | 'uz'
                          | 'zh'
                        )[]
                      | boolean
                      | undefined
                    queryLanguages?:
                      | (
                          | 'af'
                          | 'ar'
                          | 'az'
                          | 'bg'
                          | 'bn'
                          | 'ca'
                          | 'cs'
                          | 'cy'
                          | 'da'
                          | 'de'
                          | 'el'
                          | 'en'
                          | 'eo'
                          | 'es'
                          | 'et'
                          | 'eu'
                          | 'fa'
                          | 'fi'
                          | 'fo'
                          | 'fr'
                          | 'ga'
                          | 'gl'
                          | 'he'
                          | 'hi'
                          | 'hu'
                          | 'hy'
                          | 'id'
                          | 'is'
                          | 'it'
                          | 'ja'
                          | 'ka'
                          | 'kk'
                          | 'ko'
                          | 'ku'
                          | 'ky'
                          | 'lt'
                          | 'lv'
                          | 'mi'
                          | 'mn'
                          | 'mr'
                          | 'ms'
                          | 'mt'
                          | 'nb'
                          | 'nl'
                          | 'no'
                          | 'ns'
                          | 'pl'
                          | 'ps'
                          | 'pt'
                          | 'pt-br'
                          | 'qu'
                          | 'ro'
                          | 'ru'
                          | 'sk'
                          | 'sq'
                          | 'sv'
                          | 'sw'
                          | 'ta'
                          | 'te'
                          | 'th'
                          | 'tl'
                          | 'tn'
                          | 'tr'
                          | 'tt'
                          | 'uk'
                          | 'ur'
                          | 'uz'
                          | 'zh'
                        )[]
                      | undefined
                    decompoundQuery?: boolean | undefined
                    enableRules?: boolean | undefined
                    enablePersonalization?: boolean | undefined
                    queryType?: 'prefixLast' | 'prefixAll' | 'prefixNone' | undefined
                    removeWordsIfNoResults?:
                      | 'none'
                      | 'lastWords'
                      | 'firstWords'
                      | 'allOptional'
                      | undefined
                    mode?: 'neuralSearch' | 'keywordSearch' | undefined
                    semanticSearch?:
                      | { eventSources?: string[] | ({ [x: string]: unknown } | null) | undefined }
                      | undefined
                    advancedSyntax?: boolean | undefined
                    optionalWords?:
                      | string
                      | ({ [x: string]: unknown } | null)
                      | string[]
                      | undefined
                    disableExactOnAttributes?: string[] | undefined
                    exactOnSingleWordQuery?: 'attribute' | 'none' | 'word' | undefined
                    alternativesAsExact?:
                      | (
                          | 'ignorePlurals'
                          | 'singleWordSynonym'
                          | 'multiWordsSynonym'
                          | 'ignoreConjugations'
                        )[]
                      | undefined
                    advancedSyntaxFeatures?: ('exactPhrase' | 'excludeWords')[] | undefined
                    distinct?: boolean | number | undefined
                    replaceSynonymsInHighlight?: boolean | undefined
                    minProximity?: number | undefined
                    responseFields?: string[] | undefined
                    maxValuesPerFacet?: number | undefined
                    sortFacetValuesBy?: string | undefined
                    attributeCriteriaComputedByMinProximity?: boolean | undefined
                    renderingContent?:
                      | {
                          facetOrdering?:
                            | {
                                facets?: { order?: string[] | undefined } | undefined
                                values?:
                                  | {
                                      [x: string]: {
                                        order?: string[] | undefined
                                        sortRemainingBy?: 'count' | 'alpha' | 'hidden' | undefined
                                        hide?: string[] | undefined
                                      }
                                    }
                                  | undefined
                              }
                            | undefined
                          redirect?: { url?: string | undefined } | undefined
                          widgets?:
                            | {
                                banners?:
                                  | {
                                      image?:
                                        | {
                                            urls?: { url?: string | undefined }[] | undefined
                                            title?: string | undefined
                                          }
                                        | undefined
                                      link?: { url?: string | undefined } | undefined
                                    }[]
                                  | undefined
                              }
                            | undefined
                        }
                      | undefined
                    enableReRanking?: boolean | undefined
                    reRankingApplyFilter?:
                      | unknown[]
                      | string
                      | ({ [x: string]: unknown } | null)
                      | undefined
                    cursor?: string | undefined
                  }
                | { params?: string | undefined }
            }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 400
          }
        | {
            input: { param: { indexName: string } } & {
              json:
                | {
                    query?: string | undefined
                    similarQuery?: string | undefined
                    filters?: string | undefined
                    facetFilters?: unknown[] | string | undefined
                    optionalFilters?: unknown[] | string | undefined
                    numericFilters?: unknown[] | string | undefined
                    tagFilters?: unknown[] | string | undefined
                    sumOrFiltersScores?: boolean | undefined
                    restrictSearchableAttributes?: string[] | undefined
                    facets?: string[] | undefined
                    facetingAfterDistinct?: boolean | undefined
                    page?: number | undefined
                    offset?: number | undefined
                    length?: number | undefined
                    aroundLatLng?: string | undefined
                    aroundLatLngViaIP?: boolean | undefined
                    aroundRadius?: number | 'all' | undefined
                    aroundPrecision?:
                      | number
                      | { from?: number | undefined; value?: number | undefined }[]
                      | undefined
                    minimumAroundRadius?: number | undefined
                    insideBoundingBox?:
                      | string
                      | ({ [x: string]: unknown } | null)
                      | number[][]
                      | undefined
                    insidePolygon?: number[][] | undefined
                    naturalLanguages?:
                      | (
                          | 'af'
                          | 'ar'
                          | 'az'
                          | 'bg'
                          | 'bn'
                          | 'ca'
                          | 'cs'
                          | 'cy'
                          | 'da'
                          | 'de'
                          | 'el'
                          | 'en'
                          | 'eo'
                          | 'es'
                          | 'et'
                          | 'eu'
                          | 'fa'
                          | 'fi'
                          | 'fo'
                          | 'fr'
                          | 'ga'
                          | 'gl'
                          | 'he'
                          | 'hi'
                          | 'hu'
                          | 'hy'
                          | 'id'
                          | 'is'
                          | 'it'
                          | 'ja'
                          | 'ka'
                          | 'kk'
                          | 'ko'
                          | 'ku'
                          | 'ky'
                          | 'lt'
                          | 'lv'
                          | 'mi'
                          | 'mn'
                          | 'mr'
                          | 'ms'
                          | 'mt'
                          | 'nb'
                          | 'nl'
                          | 'no'
                          | 'ns'
                          | 'pl'
                          | 'ps'
                          | 'pt'
                          | 'pt-br'
                          | 'qu'
                          | 'ro'
                          | 'ru'
                          | 'sk'
                          | 'sq'
                          | 'sv'
                          | 'sw'
                          | 'ta'
                          | 'te'
                          | 'th'
                          | 'tl'
                          | 'tn'
                          | 'tr'
                          | 'tt'
                          | 'uk'
                          | 'ur'
                          | 'uz'
                          | 'zh'
                        )[]
                      | undefined
                    ruleContexts?: string[] | undefined
                    personalizationImpact?: number | undefined
                    userToken?: string | undefined
                    getRankingInfo?: boolean | undefined
                    synonyms?: boolean | undefined
                    clickAnalytics?: boolean | undefined
                    analytics?: boolean | undefined
                    analyticsTags?: string[] | undefined
                    percentileComputation?: boolean | undefined
                    enableABTest?: boolean | undefined
                    attributesToRetrieve?: string[] | undefined
                    ranking?: string[] | undefined
                    relevancyStrictness?: number | undefined
                    attributesToHighlight?: string[] | undefined
                    attributesToSnippet?: string[] | undefined
                    highlightPreTag?: string | undefined
                    highlightPostTag?: string | undefined
                    snippetEllipsisText?: string | undefined
                    restrictHighlightAndSnippetArrays?: boolean | undefined
                    hitsPerPage?: number | undefined
                    minWordSizefor1Typo?: number | undefined
                    minWordSizefor2Typos?: number | undefined
                    typoTolerance?: boolean | 'min' | 'strict' | 'true' | 'false' | undefined
                    allowTyposOnNumericTokens?: boolean | undefined
                    disableTypoToleranceOnAttributes?: string[] | undefined
                    ignorePlurals?:
                      | (
                          | 'af'
                          | 'ar'
                          | 'az'
                          | 'bg'
                          | 'bn'
                          | 'ca'
                          | 'cs'
                          | 'cy'
                          | 'da'
                          | 'de'
                          | 'el'
                          | 'en'
                          | 'eo'
                          | 'es'
                          | 'et'
                          | 'eu'
                          | 'fa'
                          | 'fi'
                          | 'fo'
                          | 'fr'
                          | 'ga'
                          | 'gl'
                          | 'he'
                          | 'hi'
                          | 'hu'
                          | 'hy'
                          | 'id'
                          | 'is'
                          | 'it'
                          | 'ja'
                          | 'ka'
                          | 'kk'
                          | 'ko'
                          | 'ku'
                          | 'ky'
                          | 'lt'
                          | 'lv'
                          | 'mi'
                          | 'mn'
                          | 'mr'
                          | 'ms'
                          | 'mt'
                          | 'nb'
                          | 'nl'
                          | 'no'
                          | 'ns'
                          | 'pl'
                          | 'ps'
                          | 'pt'
                          | 'pt-br'
                          | 'qu'
                          | 'ro'
                          | 'ru'
                          | 'sk'
                          | 'sq'
                          | 'sv'
                          | 'sw'
                          | 'ta'
                          | 'te'
                          | 'th'
                          | 'tl'
                          | 'tn'
                          | 'tr'
                          | 'tt'
                          | 'uk'
                          | 'ur'
                          | 'uz'
                          | 'zh'
                        )[]
                      | 'true'
                      | 'false'
                      | boolean
                      | undefined
                    removeStopWords?:
                      | (
                          | 'af'
                          | 'ar'
                          | 'az'
                          | 'bg'
                          | 'bn'
                          | 'ca'
                          | 'cs'
                          | 'cy'
                          | 'da'
                          | 'de'
                          | 'el'
                          | 'en'
                          | 'eo'
                          | 'es'
                          | 'et'
                          | 'eu'
                          | 'fa'
                          | 'fi'
                          | 'fo'
                          | 'fr'
                          | 'ga'
                          | 'gl'
                          | 'he'
                          | 'hi'
                          | 'hu'
                          | 'hy'
                          | 'id'
                          | 'is'
                          | 'it'
                          | 'ja'
                          | 'ka'
                          | 'kk'
                          | 'ko'
                          | 'ku'
                          | 'ky'
                          | 'lt'
                          | 'lv'
                          | 'mi'
                          | 'mn'
                          | 'mr'
                          | 'ms'
                          | 'mt'
                          | 'nb'
                          | 'nl'
                          | 'no'
                          | 'ns'
                          | 'pl'
                          | 'ps'
                          | 'pt'
                          | 'pt-br'
                          | 'qu'
                          | 'ro'
                          | 'ru'
                          | 'sk'
                          | 'sq'
                          | 'sv'
                          | 'sw'
                          | 'ta'
                          | 'te'
                          | 'th'
                          | 'tl'
                          | 'tn'
                          | 'tr'
                          | 'tt'
                          | 'uk'
                          | 'ur'
                          | 'uz'
                          | 'zh'
                        )[]
                      | boolean
                      | undefined
                    queryLanguages?:
                      | (
                          | 'af'
                          | 'ar'
                          | 'az'
                          | 'bg'
                          | 'bn'
                          | 'ca'
                          | 'cs'
                          | 'cy'
                          | 'da'
                          | 'de'
                          | 'el'
                          | 'en'
                          | 'eo'
                          | 'es'
                          | 'et'
                          | 'eu'
                          | 'fa'
                          | 'fi'
                          | 'fo'
                          | 'fr'
                          | 'ga'
                          | 'gl'
                          | 'he'
                          | 'hi'
                          | 'hu'
                          | 'hy'
                          | 'id'
                          | 'is'
                          | 'it'
                          | 'ja'
                          | 'ka'
                          | 'kk'
                          | 'ko'
                          | 'ku'
                          | 'ky'
                          | 'lt'
                          | 'lv'
                          | 'mi'
                          | 'mn'
                          | 'mr'
                          | 'ms'
                          | 'mt'
                          | 'nb'
                          | 'nl'
                          | 'no'
                          | 'ns'
                          | 'pl'
                          | 'ps'
                          | 'pt'
                          | 'pt-br'
                          | 'qu'
                          | 'ro'
                          | 'ru'
                          | 'sk'
                          | 'sq'
                          | 'sv'
                          | 'sw'
                          | 'ta'
                          | 'te'
                          | 'th'
                          | 'tl'
                          | 'tn'
                          | 'tr'
                          | 'tt'
                          | 'uk'
                          | 'ur'
                          | 'uz'
                          | 'zh'
                        )[]
                      | undefined
                    decompoundQuery?: boolean | undefined
                    enableRules?: boolean | undefined
                    enablePersonalization?: boolean | undefined
                    queryType?: 'prefixLast' | 'prefixAll' | 'prefixNone' | undefined
                    removeWordsIfNoResults?:
                      | 'none'
                      | 'lastWords'
                      | 'firstWords'
                      | 'allOptional'
                      | undefined
                    mode?: 'neuralSearch' | 'keywordSearch' | undefined
                    semanticSearch?:
                      | { eventSources?: string[] | ({ [x: string]: unknown } | null) | undefined }
                      | undefined
                    advancedSyntax?: boolean | undefined
                    optionalWords?:
                      | string
                      | ({ [x: string]: unknown } | null)
                      | string[]
                      | undefined
                    disableExactOnAttributes?: string[] | undefined
                    exactOnSingleWordQuery?: 'attribute' | 'none' | 'word' | undefined
                    alternativesAsExact?:
                      | (
                          | 'ignorePlurals'
                          | 'singleWordSynonym'
                          | 'multiWordsSynonym'
                          | 'ignoreConjugations'
                        )[]
                      | undefined
                    advancedSyntaxFeatures?: ('exactPhrase' | 'excludeWords')[] | undefined
                    distinct?: boolean | number | undefined
                    replaceSynonymsInHighlight?: boolean | undefined
                    minProximity?: number | undefined
                    responseFields?: string[] | undefined
                    maxValuesPerFacet?: number | undefined
                    sortFacetValuesBy?: string | undefined
                    attributeCriteriaComputedByMinProximity?: boolean | undefined
                    renderingContent?:
                      | {
                          facetOrdering?:
                            | {
                                facets?: { order?: string[] | undefined } | undefined
                                values?:
                                  | {
                                      [x: string]: {
                                        order?: string[] | undefined
                                        sortRemainingBy?: 'count' | 'alpha' | 'hidden' | undefined
                                        hide?: string[] | undefined
                                      }
                                    }
                                  | undefined
                              }
                            | undefined
                          redirect?: { url?: string | undefined } | undefined
                          widgets?:
                            | {
                                banners?:
                                  | {
                                      image?:
                                        | {
                                            urls?: { url?: string | undefined }[] | undefined
                                            title?: string | undefined
                                          }
                                        | undefined
                                      link?: { url?: string | undefined } | undefined
                                    }[]
                                  | undefined
                              }
                            | undefined
                        }
                      | undefined
                    enableReRanking?: boolean | undefined
                    reRankingApplyFilter?:
                      | unknown[]
                      | string
                      | ({ [x: string]: unknown } | null)
                      | undefined
                    cursor?: string | undefined
                  }
                | { params?: string | undefined }
            }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 402
          }
        | {
            input: { param: { indexName: string } } & {
              json:
                | {
                    query?: string | undefined
                    similarQuery?: string | undefined
                    filters?: string | undefined
                    facetFilters?: unknown[] | string | undefined
                    optionalFilters?: unknown[] | string | undefined
                    numericFilters?: unknown[] | string | undefined
                    tagFilters?: unknown[] | string | undefined
                    sumOrFiltersScores?: boolean | undefined
                    restrictSearchableAttributes?: string[] | undefined
                    facets?: string[] | undefined
                    facetingAfterDistinct?: boolean | undefined
                    page?: number | undefined
                    offset?: number | undefined
                    length?: number | undefined
                    aroundLatLng?: string | undefined
                    aroundLatLngViaIP?: boolean | undefined
                    aroundRadius?: number | 'all' | undefined
                    aroundPrecision?:
                      | number
                      | { from?: number | undefined; value?: number | undefined }[]
                      | undefined
                    minimumAroundRadius?: number | undefined
                    insideBoundingBox?:
                      | string
                      | ({ [x: string]: unknown } | null)
                      | number[][]
                      | undefined
                    insidePolygon?: number[][] | undefined
                    naturalLanguages?:
                      | (
                          | 'af'
                          | 'ar'
                          | 'az'
                          | 'bg'
                          | 'bn'
                          | 'ca'
                          | 'cs'
                          | 'cy'
                          | 'da'
                          | 'de'
                          | 'el'
                          | 'en'
                          | 'eo'
                          | 'es'
                          | 'et'
                          | 'eu'
                          | 'fa'
                          | 'fi'
                          | 'fo'
                          | 'fr'
                          | 'ga'
                          | 'gl'
                          | 'he'
                          | 'hi'
                          | 'hu'
                          | 'hy'
                          | 'id'
                          | 'is'
                          | 'it'
                          | 'ja'
                          | 'ka'
                          | 'kk'
                          | 'ko'
                          | 'ku'
                          | 'ky'
                          | 'lt'
                          | 'lv'
                          | 'mi'
                          | 'mn'
                          | 'mr'
                          | 'ms'
                          | 'mt'
                          | 'nb'
                          | 'nl'
                          | 'no'
                          | 'ns'
                          | 'pl'
                          | 'ps'
                          | 'pt'
                          | 'pt-br'
                          | 'qu'
                          | 'ro'
                          | 'ru'
                          | 'sk'
                          | 'sq'
                          | 'sv'
                          | 'sw'
                          | 'ta'
                          | 'te'
                          | 'th'
                          | 'tl'
                          | 'tn'
                          | 'tr'
                          | 'tt'
                          | 'uk'
                          | 'ur'
                          | 'uz'
                          | 'zh'
                        )[]
                      | undefined
                    ruleContexts?: string[] | undefined
                    personalizationImpact?: number | undefined
                    userToken?: string | undefined
                    getRankingInfo?: boolean | undefined
                    synonyms?: boolean | undefined
                    clickAnalytics?: boolean | undefined
                    analytics?: boolean | undefined
                    analyticsTags?: string[] | undefined
                    percentileComputation?: boolean | undefined
                    enableABTest?: boolean | undefined
                    attributesToRetrieve?: string[] | undefined
                    ranking?: string[] | undefined
                    relevancyStrictness?: number | undefined
                    attributesToHighlight?: string[] | undefined
                    attributesToSnippet?: string[] | undefined
                    highlightPreTag?: string | undefined
                    highlightPostTag?: string | undefined
                    snippetEllipsisText?: string | undefined
                    restrictHighlightAndSnippetArrays?: boolean | undefined
                    hitsPerPage?: number | undefined
                    minWordSizefor1Typo?: number | undefined
                    minWordSizefor2Typos?: number | undefined
                    typoTolerance?: boolean | 'min' | 'strict' | 'true' | 'false' | undefined
                    allowTyposOnNumericTokens?: boolean | undefined
                    disableTypoToleranceOnAttributes?: string[] | undefined
                    ignorePlurals?:
                      | (
                          | 'af'
                          | 'ar'
                          | 'az'
                          | 'bg'
                          | 'bn'
                          | 'ca'
                          | 'cs'
                          | 'cy'
                          | 'da'
                          | 'de'
                          | 'el'
                          | 'en'
                          | 'eo'
                          | 'es'
                          | 'et'
                          | 'eu'
                          | 'fa'
                          | 'fi'
                          | 'fo'
                          | 'fr'
                          | 'ga'
                          | 'gl'
                          | 'he'
                          | 'hi'
                          | 'hu'
                          | 'hy'
                          | 'id'
                          | 'is'
                          | 'it'
                          | 'ja'
                          | 'ka'
                          | 'kk'
                          | 'ko'
                          | 'ku'
                          | 'ky'
                          | 'lt'
                          | 'lv'
                          | 'mi'
                          | 'mn'
                          | 'mr'
                          | 'ms'
                          | 'mt'
                          | 'nb'
                          | 'nl'
                          | 'no'
                          | 'ns'
                          | 'pl'
                          | 'ps'
                          | 'pt'
                          | 'pt-br'
                          | 'qu'
                          | 'ro'
                          | 'ru'
                          | 'sk'
                          | 'sq'
                          | 'sv'
                          | 'sw'
                          | 'ta'
                          | 'te'
                          | 'th'
                          | 'tl'
                          | 'tn'
                          | 'tr'
                          | 'tt'
                          | 'uk'
                          | 'ur'
                          | 'uz'
                          | 'zh'
                        )[]
                      | 'true'
                      | 'false'
                      | boolean
                      | undefined
                    removeStopWords?:
                      | (
                          | 'af'
                          | 'ar'
                          | 'az'
                          | 'bg'
                          | 'bn'
                          | 'ca'
                          | 'cs'
                          | 'cy'
                          | 'da'
                          | 'de'
                          | 'el'
                          | 'en'
                          | 'eo'
                          | 'es'
                          | 'et'
                          | 'eu'
                          | 'fa'
                          | 'fi'
                          | 'fo'
                          | 'fr'
                          | 'ga'
                          | 'gl'
                          | 'he'
                          | 'hi'
                          | 'hu'
                          | 'hy'
                          | 'id'
                          | 'is'
                          | 'it'
                          | 'ja'
                          | 'ka'
                          | 'kk'
                          | 'ko'
                          | 'ku'
                          | 'ky'
                          | 'lt'
                          | 'lv'
                          | 'mi'
                          | 'mn'
                          | 'mr'
                          | 'ms'
                          | 'mt'
                          | 'nb'
                          | 'nl'
                          | 'no'
                          | 'ns'
                          | 'pl'
                          | 'ps'
                          | 'pt'
                          | 'pt-br'
                          | 'qu'
                          | 'ro'
                          | 'ru'
                          | 'sk'
                          | 'sq'
                          | 'sv'
                          | 'sw'
                          | 'ta'
                          | 'te'
                          | 'th'
                          | 'tl'
                          | 'tn'
                          | 'tr'
                          | 'tt'
                          | 'uk'
                          | 'ur'
                          | 'uz'
                          | 'zh'
                        )[]
                      | boolean
                      | undefined
                    queryLanguages?:
                      | (
                          | 'af'
                          | 'ar'
                          | 'az'
                          | 'bg'
                          | 'bn'
                          | 'ca'
                          | 'cs'
                          | 'cy'
                          | 'da'
                          | 'de'
                          | 'el'
                          | 'en'
                          | 'eo'
                          | 'es'
                          | 'et'
                          | 'eu'
                          | 'fa'
                          | 'fi'
                          | 'fo'
                          | 'fr'
                          | 'ga'
                          | 'gl'
                          | 'he'
                          | 'hi'
                          | 'hu'
                          | 'hy'
                          | 'id'
                          | 'is'
                          | 'it'
                          | 'ja'
                          | 'ka'
                          | 'kk'
                          | 'ko'
                          | 'ku'
                          | 'ky'
                          | 'lt'
                          | 'lv'
                          | 'mi'
                          | 'mn'
                          | 'mr'
                          | 'ms'
                          | 'mt'
                          | 'nb'
                          | 'nl'
                          | 'no'
                          | 'ns'
                          | 'pl'
                          | 'ps'
                          | 'pt'
                          | 'pt-br'
                          | 'qu'
                          | 'ro'
                          | 'ru'
                          | 'sk'
                          | 'sq'
                          | 'sv'
                          | 'sw'
                          | 'ta'
                          | 'te'
                          | 'th'
                          | 'tl'
                          | 'tn'
                          | 'tr'
                          | 'tt'
                          | 'uk'
                          | 'ur'
                          | 'uz'
                          | 'zh'
                        )[]
                      | undefined
                    decompoundQuery?: boolean | undefined
                    enableRules?: boolean | undefined
                    enablePersonalization?: boolean | undefined
                    queryType?: 'prefixLast' | 'prefixAll' | 'prefixNone' | undefined
                    removeWordsIfNoResults?:
                      | 'none'
                      | 'lastWords'
                      | 'firstWords'
                      | 'allOptional'
                      | undefined
                    mode?: 'neuralSearch' | 'keywordSearch' | undefined
                    semanticSearch?:
                      | { eventSources?: string[] | ({ [x: string]: unknown } | null) | undefined }
                      | undefined
                    advancedSyntax?: boolean | undefined
                    optionalWords?:
                      | string
                      | ({ [x: string]: unknown } | null)
                      | string[]
                      | undefined
                    disableExactOnAttributes?: string[] | undefined
                    exactOnSingleWordQuery?: 'attribute' | 'none' | 'word' | undefined
                    alternativesAsExact?:
                      | (
                          | 'ignorePlurals'
                          | 'singleWordSynonym'
                          | 'multiWordsSynonym'
                          | 'ignoreConjugations'
                        )[]
                      | undefined
                    advancedSyntaxFeatures?: ('exactPhrase' | 'excludeWords')[] | undefined
                    distinct?: boolean | number | undefined
                    replaceSynonymsInHighlight?: boolean | undefined
                    minProximity?: number | undefined
                    responseFields?: string[] | undefined
                    maxValuesPerFacet?: number | undefined
                    sortFacetValuesBy?: string | undefined
                    attributeCriteriaComputedByMinProximity?: boolean | undefined
                    renderingContent?:
                      | {
                          facetOrdering?:
                            | {
                                facets?: { order?: string[] | undefined } | undefined
                                values?:
                                  | {
                                      [x: string]: {
                                        order?: string[] | undefined
                                        sortRemainingBy?: 'count' | 'alpha' | 'hidden' | undefined
                                        hide?: string[] | undefined
                                      }
                                    }
                                  | undefined
                              }
                            | undefined
                          redirect?: { url?: string | undefined } | undefined
                          widgets?:
                            | {
                                banners?:
                                  | {
                                      image?:
                                        | {
                                            urls?: { url?: string | undefined }[] | undefined
                                            title?: string | undefined
                                          }
                                        | undefined
                                      link?: { url?: string | undefined } | undefined
                                    }[]
                                  | undefined
                              }
                            | undefined
                        }
                      | undefined
                    enableReRanking?: boolean | undefined
                    reRankingApplyFilter?:
                      | unknown[]
                      | string
                      | ({ [x: string]: unknown } | null)
                      | undefined
                    cursor?: string | undefined
                  }
                | { params?: string | undefined }
            }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 403
          }
        | {
            input: { param: { indexName: string } } & {
              json:
                | {
                    query?: string | undefined
                    similarQuery?: string | undefined
                    filters?: string | undefined
                    facetFilters?: unknown[] | string | undefined
                    optionalFilters?: unknown[] | string | undefined
                    numericFilters?: unknown[] | string | undefined
                    tagFilters?: unknown[] | string | undefined
                    sumOrFiltersScores?: boolean | undefined
                    restrictSearchableAttributes?: string[] | undefined
                    facets?: string[] | undefined
                    facetingAfterDistinct?: boolean | undefined
                    page?: number | undefined
                    offset?: number | undefined
                    length?: number | undefined
                    aroundLatLng?: string | undefined
                    aroundLatLngViaIP?: boolean | undefined
                    aroundRadius?: number | 'all' | undefined
                    aroundPrecision?:
                      | number
                      | { from?: number | undefined; value?: number | undefined }[]
                      | undefined
                    minimumAroundRadius?: number | undefined
                    insideBoundingBox?:
                      | string
                      | ({ [x: string]: unknown } | null)
                      | number[][]
                      | undefined
                    insidePolygon?: number[][] | undefined
                    naturalLanguages?:
                      | (
                          | 'af'
                          | 'ar'
                          | 'az'
                          | 'bg'
                          | 'bn'
                          | 'ca'
                          | 'cs'
                          | 'cy'
                          | 'da'
                          | 'de'
                          | 'el'
                          | 'en'
                          | 'eo'
                          | 'es'
                          | 'et'
                          | 'eu'
                          | 'fa'
                          | 'fi'
                          | 'fo'
                          | 'fr'
                          | 'ga'
                          | 'gl'
                          | 'he'
                          | 'hi'
                          | 'hu'
                          | 'hy'
                          | 'id'
                          | 'is'
                          | 'it'
                          | 'ja'
                          | 'ka'
                          | 'kk'
                          | 'ko'
                          | 'ku'
                          | 'ky'
                          | 'lt'
                          | 'lv'
                          | 'mi'
                          | 'mn'
                          | 'mr'
                          | 'ms'
                          | 'mt'
                          | 'nb'
                          | 'nl'
                          | 'no'
                          | 'ns'
                          | 'pl'
                          | 'ps'
                          | 'pt'
                          | 'pt-br'
                          | 'qu'
                          | 'ro'
                          | 'ru'
                          | 'sk'
                          | 'sq'
                          | 'sv'
                          | 'sw'
                          | 'ta'
                          | 'te'
                          | 'th'
                          | 'tl'
                          | 'tn'
                          | 'tr'
                          | 'tt'
                          | 'uk'
                          | 'ur'
                          | 'uz'
                          | 'zh'
                        )[]
                      | undefined
                    ruleContexts?: string[] | undefined
                    personalizationImpact?: number | undefined
                    userToken?: string | undefined
                    getRankingInfo?: boolean | undefined
                    synonyms?: boolean | undefined
                    clickAnalytics?: boolean | undefined
                    analytics?: boolean | undefined
                    analyticsTags?: string[] | undefined
                    percentileComputation?: boolean | undefined
                    enableABTest?: boolean | undefined
                    attributesToRetrieve?: string[] | undefined
                    ranking?: string[] | undefined
                    relevancyStrictness?: number | undefined
                    attributesToHighlight?: string[] | undefined
                    attributesToSnippet?: string[] | undefined
                    highlightPreTag?: string | undefined
                    highlightPostTag?: string | undefined
                    snippetEllipsisText?: string | undefined
                    restrictHighlightAndSnippetArrays?: boolean | undefined
                    hitsPerPage?: number | undefined
                    minWordSizefor1Typo?: number | undefined
                    minWordSizefor2Typos?: number | undefined
                    typoTolerance?: boolean | 'min' | 'strict' | 'true' | 'false' | undefined
                    allowTyposOnNumericTokens?: boolean | undefined
                    disableTypoToleranceOnAttributes?: string[] | undefined
                    ignorePlurals?:
                      | (
                          | 'af'
                          | 'ar'
                          | 'az'
                          | 'bg'
                          | 'bn'
                          | 'ca'
                          | 'cs'
                          | 'cy'
                          | 'da'
                          | 'de'
                          | 'el'
                          | 'en'
                          | 'eo'
                          | 'es'
                          | 'et'
                          | 'eu'
                          | 'fa'
                          | 'fi'
                          | 'fo'
                          | 'fr'
                          | 'ga'
                          | 'gl'
                          | 'he'
                          | 'hi'
                          | 'hu'
                          | 'hy'
                          | 'id'
                          | 'is'
                          | 'it'
                          | 'ja'
                          | 'ka'
                          | 'kk'
                          | 'ko'
                          | 'ku'
                          | 'ky'
                          | 'lt'
                          | 'lv'
                          | 'mi'
                          | 'mn'
                          | 'mr'
                          | 'ms'
                          | 'mt'
                          | 'nb'
                          | 'nl'
                          | 'no'
                          | 'ns'
                          | 'pl'
                          | 'ps'
                          | 'pt'
                          | 'pt-br'
                          | 'qu'
                          | 'ro'
                          | 'ru'
                          | 'sk'
                          | 'sq'
                          | 'sv'
                          | 'sw'
                          | 'ta'
                          | 'te'
                          | 'th'
                          | 'tl'
                          | 'tn'
                          | 'tr'
                          | 'tt'
                          | 'uk'
                          | 'ur'
                          | 'uz'
                          | 'zh'
                        )[]
                      | 'true'
                      | 'false'
                      | boolean
                      | undefined
                    removeStopWords?:
                      | (
                          | 'af'
                          | 'ar'
                          | 'az'
                          | 'bg'
                          | 'bn'
                          | 'ca'
                          | 'cs'
                          | 'cy'
                          | 'da'
                          | 'de'
                          | 'el'
                          | 'en'
                          | 'eo'
                          | 'es'
                          | 'et'
                          | 'eu'
                          | 'fa'
                          | 'fi'
                          | 'fo'
                          | 'fr'
                          | 'ga'
                          | 'gl'
                          | 'he'
                          | 'hi'
                          | 'hu'
                          | 'hy'
                          | 'id'
                          | 'is'
                          | 'it'
                          | 'ja'
                          | 'ka'
                          | 'kk'
                          | 'ko'
                          | 'ku'
                          | 'ky'
                          | 'lt'
                          | 'lv'
                          | 'mi'
                          | 'mn'
                          | 'mr'
                          | 'ms'
                          | 'mt'
                          | 'nb'
                          | 'nl'
                          | 'no'
                          | 'ns'
                          | 'pl'
                          | 'ps'
                          | 'pt'
                          | 'pt-br'
                          | 'qu'
                          | 'ro'
                          | 'ru'
                          | 'sk'
                          | 'sq'
                          | 'sv'
                          | 'sw'
                          | 'ta'
                          | 'te'
                          | 'th'
                          | 'tl'
                          | 'tn'
                          | 'tr'
                          | 'tt'
                          | 'uk'
                          | 'ur'
                          | 'uz'
                          | 'zh'
                        )[]
                      | boolean
                      | undefined
                    queryLanguages?:
                      | (
                          | 'af'
                          | 'ar'
                          | 'az'
                          | 'bg'
                          | 'bn'
                          | 'ca'
                          | 'cs'
                          | 'cy'
                          | 'da'
                          | 'de'
                          | 'el'
                          | 'en'
                          | 'eo'
                          | 'es'
                          | 'et'
                          | 'eu'
                          | 'fa'
                          | 'fi'
                          | 'fo'
                          | 'fr'
                          | 'ga'
                          | 'gl'
                          | 'he'
                          | 'hi'
                          | 'hu'
                          | 'hy'
                          | 'id'
                          | 'is'
                          | 'it'
                          | 'ja'
                          | 'ka'
                          | 'kk'
                          | 'ko'
                          | 'ku'
                          | 'ky'
                          | 'lt'
                          | 'lv'
                          | 'mi'
                          | 'mn'
                          | 'mr'
                          | 'ms'
                          | 'mt'
                          | 'nb'
                          | 'nl'
                          | 'no'
                          | 'ns'
                          | 'pl'
                          | 'ps'
                          | 'pt'
                          | 'pt-br'
                          | 'qu'
                          | 'ro'
                          | 'ru'
                          | 'sk'
                          | 'sq'
                          | 'sv'
                          | 'sw'
                          | 'ta'
                          | 'te'
                          | 'th'
                          | 'tl'
                          | 'tn'
                          | 'tr'
                          | 'tt'
                          | 'uk'
                          | 'ur'
                          | 'uz'
                          | 'zh'
                        )[]
                      | undefined
                    decompoundQuery?: boolean | undefined
                    enableRules?: boolean | undefined
                    enablePersonalization?: boolean | undefined
                    queryType?: 'prefixLast' | 'prefixAll' | 'prefixNone' | undefined
                    removeWordsIfNoResults?:
                      | 'none'
                      | 'lastWords'
                      | 'firstWords'
                      | 'allOptional'
                      | undefined
                    mode?: 'neuralSearch' | 'keywordSearch' | undefined
                    semanticSearch?:
                      | { eventSources?: string[] | ({ [x: string]: unknown } | null) | undefined }
                      | undefined
                    advancedSyntax?: boolean | undefined
                    optionalWords?:
                      | string
                      | ({ [x: string]: unknown } | null)
                      | string[]
                      | undefined
                    disableExactOnAttributes?: string[] | undefined
                    exactOnSingleWordQuery?: 'attribute' | 'none' | 'word' | undefined
                    alternativesAsExact?:
                      | (
                          | 'ignorePlurals'
                          | 'singleWordSynonym'
                          | 'multiWordsSynonym'
                          | 'ignoreConjugations'
                        )[]
                      | undefined
                    advancedSyntaxFeatures?: ('exactPhrase' | 'excludeWords')[] | undefined
                    distinct?: boolean | number | undefined
                    replaceSynonymsInHighlight?: boolean | undefined
                    minProximity?: number | undefined
                    responseFields?: string[] | undefined
                    maxValuesPerFacet?: number | undefined
                    sortFacetValuesBy?: string | undefined
                    attributeCriteriaComputedByMinProximity?: boolean | undefined
                    renderingContent?:
                      | {
                          facetOrdering?:
                            | {
                                facets?: { order?: string[] | undefined } | undefined
                                values?:
                                  | {
                                      [x: string]: {
                                        order?: string[] | undefined
                                        sortRemainingBy?: 'count' | 'alpha' | 'hidden' | undefined
                                        hide?: string[] | undefined
                                      }
                                    }
                                  | undefined
                              }
                            | undefined
                          redirect?: { url?: string | undefined } | undefined
                          widgets?:
                            | {
                                banners?:
                                  | {
                                      image?:
                                        | {
                                            urls?: { url?: string | undefined }[] | undefined
                                            title?: string | undefined
                                          }
                                        | undefined
                                      link?: { url?: string | undefined } | undefined
                                    }[]
                                  | undefined
                              }
                            | undefined
                        }
                      | undefined
                    enableReRanking?: boolean | undefined
                    reRankingApplyFilter?:
                      | unknown[]
                      | string
                      | ({ [x: string]: unknown } | null)
                      | undefined
                    cursor?: string | undefined
                  }
                | { params?: string | undefined }
            }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 404
          }
    }
  } & {
    '/1/indexes/:indexName': {
      $post:
        | {
            input: { param: { indexName: string } } & { json: { [x: string]: unknown } }
            output: { createdAt: string; taskID: bigint; objectID?: string | undefined }
            outputFormat: 'json'
            status: 201
          }
        | {
            input: { param: { indexName: string } } & { json: { [x: string]: unknown } }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 400
          }
        | {
            input: { param: { indexName: string } } & { json: { [x: string]: unknown } }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 402
          }
        | {
            input: { param: { indexName: string } } & { json: { [x: string]: unknown } }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 403
          }
        | {
            input: { param: { indexName: string } } & { json: { [x: string]: unknown } }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 404
          }
      $delete:
        | {
            input: { param: { indexName: string } }
            output: { taskID: bigint; deletedAt: string }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { param: { indexName: string } }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 400
          }
        | {
            input: { param: { indexName: string } }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 402
          }
        | {
            input: { param: { indexName: string } }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 403
          }
        | {
            input: { param: { indexName: string } }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 404
          }
    }
  } & {
    '/1/indexes/:indexName/:objectID': {
      $get:
        | {
            input: { param: { indexName: string; objectID: string } } & {
              query: { attributesToRetrieve?: string[] | undefined }
            }
            output: { [x: string]: unknown }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { param: { indexName: string; objectID: string } } & {
              query: { attributesToRetrieve?: string[] | undefined }
            }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 400
          }
        | {
            input: { param: { indexName: string; objectID: string } } & {
              query: { attributesToRetrieve?: string[] | undefined }
            }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 402
          }
        | {
            input: { param: { indexName: string; objectID: string } } & {
              query: { attributesToRetrieve?: string[] | undefined }
            }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 403
          }
        | {
            input: { param: { indexName: string; objectID: string } } & {
              query: { attributesToRetrieve?: string[] | undefined }
            }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 404
          }
      $put:
        | {
            input: { param: { indexName: string; objectID: string } } & {
              json: { [x: string]: unknown }
            }
            output: {
              taskID?: bigint | undefined
              updatedAt?: string | undefined
              objectID?: string | undefined
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { param: { indexName: string; objectID: string } } & {
              json: { [x: string]: unknown }
            }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 400
          }
        | {
            input: { param: { indexName: string; objectID: string } } & {
              json: { [x: string]: unknown }
            }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 402
          }
        | {
            input: { param: { indexName: string; objectID: string } } & {
              json: { [x: string]: unknown }
            }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 403
          }
        | {
            input: { param: { indexName: string; objectID: string } } & {
              json: { [x: string]: unknown }
            }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 404
          }
      $delete:
        | {
            input: { param: { indexName: string; objectID: string } }
            output: { taskID: bigint; deletedAt: string }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { param: { indexName: string; objectID: string } }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 400
          }
        | {
            input: { param: { indexName: string; objectID: string } }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 402
          }
        | {
            input: { param: { indexName: string; objectID: string } }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 403
          }
        | {
            input: { param: { indexName: string; objectID: string } }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 404
          }
    }
  } & {
    '/1/indexes/:indexName/deleteByQuery': {
      $post:
        | {
            input: { param: { indexName: string } } & {
              json: {
                facetFilters?: unknown[] | string | undefined
                filters?: string | undefined
                numericFilters?: unknown[] | string | undefined
                tagFilters?: unknown[] | string | undefined
                aroundLatLng?: string | undefined
                aroundRadius?: number | 'all' | undefined
                insideBoundingBox?:
                  | string
                  | ({ [x: string]: unknown } | null)
                  | number[][]
                  | undefined
                insidePolygon?: number[][] | undefined
              }
            }
            output: { taskID: bigint; updatedAt: string }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { param: { indexName: string } } & {
              json: {
                facetFilters?: unknown[] | string | undefined
                filters?: string | undefined
                numericFilters?: unknown[] | string | undefined
                tagFilters?: unknown[] | string | undefined
                aroundLatLng?: string | undefined
                aroundRadius?: number | 'all' | undefined
                insideBoundingBox?:
                  | string
                  | ({ [x: string]: unknown } | null)
                  | number[][]
                  | undefined
                insidePolygon?: number[][] | undefined
              }
            }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 400
          }
        | {
            input: { param: { indexName: string } } & {
              json: {
                facetFilters?: unknown[] | string | undefined
                filters?: string | undefined
                numericFilters?: unknown[] | string | undefined
                tagFilters?: unknown[] | string | undefined
                aroundLatLng?: string | undefined
                aroundRadius?: number | 'all' | undefined
                insideBoundingBox?:
                  | string
                  | ({ [x: string]: unknown } | null)
                  | number[][]
                  | undefined
                insidePolygon?: number[][] | undefined
              }
            }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 402
          }
        | {
            input: { param: { indexName: string } } & {
              json: {
                facetFilters?: unknown[] | string | undefined
                filters?: string | undefined
                numericFilters?: unknown[] | string | undefined
                tagFilters?: unknown[] | string | undefined
                aroundLatLng?: string | undefined
                aroundRadius?: number | 'all' | undefined
                insideBoundingBox?:
                  | string
                  | ({ [x: string]: unknown } | null)
                  | number[][]
                  | undefined
                insidePolygon?: number[][] | undefined
              }
            }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 403
          }
        | {
            input: { param: { indexName: string } } & {
              json: {
                facetFilters?: unknown[] | string | undefined
                filters?: string | undefined
                numericFilters?: unknown[] | string | undefined
                tagFilters?: unknown[] | string | undefined
                aroundLatLng?: string | undefined
                aroundRadius?: number | 'all' | undefined
                insideBoundingBox?:
                  | string
                  | ({ [x: string]: unknown } | null)
                  | number[][]
                  | undefined
                insidePolygon?: number[][] | undefined
              }
            }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 404
          }
    }
  } & {
    '/1/indexes/:indexName/clear': {
      $post:
        | {
            input: { param: { indexName: string } }
            output: { taskID: bigint; updatedAt: string }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { param: { indexName: string } }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 400
          }
        | {
            input: { param: { indexName: string } }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 402
          }
        | {
            input: { param: { indexName: string } }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 403
          }
        | {
            input: { param: { indexName: string } }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 404
          }
    }
  } & {
    '/1/indexes/:indexName/:objectID/partial': {
      $post:
        | {
            input: { param: { indexName: string; objectID: string } } & {
              query: { createIfNotExists?: boolean | undefined }
            } & { json: { [x: string]: unknown } }
            output: {
              taskID?: bigint | undefined
              updatedAt?: string | undefined
              objectID?: string | undefined
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { param: { indexName: string; objectID: string } } & {
              query: { createIfNotExists?: boolean | undefined }
            } & { json: { [x: string]: unknown } }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 400
          }
        | {
            input: { param: { indexName: string; objectID: string } } & {
              query: { createIfNotExists?: boolean | undefined }
            } & { json: { [x: string]: unknown } }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 402
          }
        | {
            input: { param: { indexName: string; objectID: string } } & {
              query: { createIfNotExists?: boolean | undefined }
            } & { json: { [x: string]: unknown } }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 403
          }
        | {
            input: { param: { indexName: string; objectID: string } } & {
              query: { createIfNotExists?: boolean | undefined }
            } & { json: { [x: string]: unknown } }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 404
          }
    }
  } & {
    '/1/indexes/:indexName/batch': {
      $post:
        | {
            input: { param: { indexName: string } } & {
              json: {
                requests: {
                  action:
                    | 'addObject'
                    | 'updateObject'
                    | 'partialUpdateObject'
                    | 'partialUpdateObjectNoCreate'
                    | 'deleteObject'
                    | 'delete'
                    | 'clear'
                  body: { [x: string]: unknown }
                }[]
              }
            }
            output: { taskID: bigint; objectIDs: string[] }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { param: { indexName: string } } & {
              json: {
                requests: {
                  action:
                    | 'addObject'
                    | 'updateObject'
                    | 'partialUpdateObject'
                    | 'partialUpdateObjectNoCreate'
                    | 'deleteObject'
                    | 'delete'
                    | 'clear'
                  body: { [x: string]: unknown }
                }[]
              }
            }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 400
          }
        | {
            input: { param: { indexName: string } } & {
              json: {
                requests: {
                  action:
                    | 'addObject'
                    | 'updateObject'
                    | 'partialUpdateObject'
                    | 'partialUpdateObjectNoCreate'
                    | 'deleteObject'
                    | 'delete'
                    | 'clear'
                  body: { [x: string]: unknown }
                }[]
              }
            }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 402
          }
        | {
            input: { param: { indexName: string } } & {
              json: {
                requests: {
                  action:
                    | 'addObject'
                    | 'updateObject'
                    | 'partialUpdateObject'
                    | 'partialUpdateObjectNoCreate'
                    | 'deleteObject'
                    | 'delete'
                    | 'clear'
                  body: { [x: string]: unknown }
                }[]
              }
            }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 403
          }
        | {
            input: { param: { indexName: string } } & {
              json: {
                requests: {
                  action:
                    | 'addObject'
                    | 'updateObject'
                    | 'partialUpdateObject'
                    | 'partialUpdateObjectNoCreate'
                    | 'deleteObject'
                    | 'delete'
                    | 'clear'
                  body: { [x: string]: unknown }
                }[]
              }
            }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 404
          }
    }
  } & {
    '/1/indexes/*/batch': {
      $post:
        | {
            input: {
              json: {
                requests: {
                  action:
                    | 'addObject'
                    | 'updateObject'
                    | 'partialUpdateObject'
                    | 'partialUpdateObjectNoCreate'
                    | 'deleteObject'
                    | 'delete'
                    | 'clear'
                  body?: { [x: string]: unknown } | undefined
                  indexName: string
                }[]
              }
            }
            output: { taskID: { [x: string]: bigint }; objectIDs: string[] }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: {
              json: {
                requests: {
                  action:
                    | 'addObject'
                    | 'updateObject'
                    | 'partialUpdateObject'
                    | 'partialUpdateObjectNoCreate'
                    | 'deleteObject'
                    | 'delete'
                    | 'clear'
                  body?: { [x: string]: unknown } | undefined
                  indexName: string
                }[]
              }
            }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 400
          }
        | {
            input: {
              json: {
                requests: {
                  action:
                    | 'addObject'
                    | 'updateObject'
                    | 'partialUpdateObject'
                    | 'partialUpdateObjectNoCreate'
                    | 'deleteObject'
                    | 'delete'
                    | 'clear'
                  body?: { [x: string]: unknown } | undefined
                  indexName: string
                }[]
              }
            }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 402
          }
        | {
            input: {
              json: {
                requests: {
                  action:
                    | 'addObject'
                    | 'updateObject'
                    | 'partialUpdateObject'
                    | 'partialUpdateObjectNoCreate'
                    | 'deleteObject'
                    | 'delete'
                    | 'clear'
                  body?: { [x: string]: unknown } | undefined
                  indexName: string
                }[]
              }
            }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 403
          }
        | {
            input: {
              json: {
                requests: {
                  action:
                    | 'addObject'
                    | 'updateObject'
                    | 'partialUpdateObject'
                    | 'partialUpdateObjectNoCreate'
                    | 'deleteObject'
                    | 'delete'
                    | 'clear'
                  body?: { [x: string]: unknown } | undefined
                  indexName: string
                }[]
              }
            }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 404
          }
    }
  } & {
    '/1/indexes/*/objects': {
      $post:
        | {
            input: {
              json: {
                requests: {
                  attributesToRetrieve?: string[] | undefined
                  objectID: string
                  indexName: string
                }[]
              }
            }
            output: { message?: string | undefined; results: { [x: string]: unknown }[] }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: {
              json: {
                requests: {
                  attributesToRetrieve?: string[] | undefined
                  objectID: string
                  indexName: string
                }[]
              }
            }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 400
          }
        | {
            input: {
              json: {
                requests: {
                  attributesToRetrieve?: string[] | undefined
                  objectID: string
                  indexName: string
                }[]
              }
            }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 402
          }
        | {
            input: {
              json: {
                requests: {
                  attributesToRetrieve?: string[] | undefined
                  objectID: string
                  indexName: string
                }[]
              }
            }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 403
          }
        | {
            input: {
              json: {
                requests: {
                  attributesToRetrieve?: string[] | undefined
                  objectID: string
                  indexName: string
                }[]
              }
            }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 404
          }
    }
  } & {
    '/1/indexes/:indexName/settings': {
      $get:
        | {
            input: { param: { indexName: string } } & { query: { getVersion?: number | undefined } }
            output: {
              attributesForFaceting?: string[] | undefined
              replicas?: string[] | undefined
              paginationLimitedTo?: number | undefined
              unretrievableAttributes?: string[] | undefined
              disableTypoToleranceOnWords?: string[] | undefined
              attributesToTransliterate?: string[] | undefined
              camelCaseAttributes?: string[] | undefined
              decompoundedAttributes?: { [x: string]: unknown } | undefined
              indexLanguages?:
                | (
                    | 'af'
                    | 'ar'
                    | 'az'
                    | 'bg'
                    | 'bn'
                    | 'ca'
                    | 'cs'
                    | 'cy'
                    | 'da'
                    | 'de'
                    | 'el'
                    | 'en'
                    | 'eo'
                    | 'es'
                    | 'et'
                    | 'eu'
                    | 'fa'
                    | 'fi'
                    | 'fo'
                    | 'fr'
                    | 'ga'
                    | 'gl'
                    | 'he'
                    | 'hi'
                    | 'hu'
                    | 'hy'
                    | 'id'
                    | 'is'
                    | 'it'
                    | 'ja'
                    | 'ka'
                    | 'kk'
                    | 'ko'
                    | 'ku'
                    | 'ky'
                    | 'lt'
                    | 'lv'
                    | 'mi'
                    | 'mn'
                    | 'mr'
                    | 'ms'
                    | 'mt'
                    | 'nb'
                    | 'nl'
                    | 'no'
                    | 'ns'
                    | 'pl'
                    | 'ps'
                    | 'pt'
                    | 'pt-br'
                    | 'qu'
                    | 'ro'
                    | 'ru'
                    | 'sk'
                    | 'sq'
                    | 'sv'
                    | 'sw'
                    | 'ta'
                    | 'te'
                    | 'th'
                    | 'tl'
                    | 'tn'
                    | 'tr'
                    | 'tt'
                    | 'uk'
                    | 'ur'
                    | 'uz'
                    | 'zh'
                  )[]
                | undefined
              disablePrefixOnAttributes?: string[] | undefined
              allowCompressionOfIntegerArray?: boolean | undefined
              numericAttributesForFiltering?: string[] | undefined
              separatorsToIndex?: string | undefined
              searchableAttributes?: string[] | undefined
              userData?: { [x: string]: unknown } | undefined
              customNormalization?: { [x: string]: { [x: string]: string } } | undefined
              attributeForDistinct?: string | undefined
              maxFacetHits?: number | undefined
              keepDiacriticsOnCharacters?: string | undefined
              customRanking?: string[] | undefined
              attributesToRetrieve?: string[] | undefined
              ranking?: string[] | undefined
              relevancyStrictness?: number | undefined
              attributesToHighlight?: string[] | undefined
              attributesToSnippet?: string[] | undefined
              highlightPreTag?: string | undefined
              highlightPostTag?: string | undefined
              snippetEllipsisText?: string | undefined
              restrictHighlightAndSnippetArrays?: boolean | undefined
              hitsPerPage?: number | undefined
              minWordSizefor1Typo?: number | undefined
              minWordSizefor2Typos?: number | undefined
              typoTolerance?: boolean | 'min' | 'strict' | 'true' | 'false' | undefined
              allowTyposOnNumericTokens?: boolean | undefined
              disableTypoToleranceOnAttributes?: string[] | undefined
              ignorePlurals?:
                | (
                    | 'af'
                    | 'ar'
                    | 'az'
                    | 'bg'
                    | 'bn'
                    | 'ca'
                    | 'cs'
                    | 'cy'
                    | 'da'
                    | 'de'
                    | 'el'
                    | 'en'
                    | 'eo'
                    | 'es'
                    | 'et'
                    | 'eu'
                    | 'fa'
                    | 'fi'
                    | 'fo'
                    | 'fr'
                    | 'ga'
                    | 'gl'
                    | 'he'
                    | 'hi'
                    | 'hu'
                    | 'hy'
                    | 'id'
                    | 'is'
                    | 'it'
                    | 'ja'
                    | 'ka'
                    | 'kk'
                    | 'ko'
                    | 'ku'
                    | 'ky'
                    | 'lt'
                    | 'lv'
                    | 'mi'
                    | 'mn'
                    | 'mr'
                    | 'ms'
                    | 'mt'
                    | 'nb'
                    | 'nl'
                    | 'no'
                    | 'ns'
                    | 'pl'
                    | 'ps'
                    | 'pt'
                    | 'pt-br'
                    | 'qu'
                    | 'ro'
                    | 'ru'
                    | 'sk'
                    | 'sq'
                    | 'sv'
                    | 'sw'
                    | 'ta'
                    | 'te'
                    | 'th'
                    | 'tl'
                    | 'tn'
                    | 'tr'
                    | 'tt'
                    | 'uk'
                    | 'ur'
                    | 'uz'
                    | 'zh'
                  )[]
                | 'true'
                | 'false'
                | boolean
                | undefined
              removeStopWords?:
                | (
                    | 'af'
                    | 'ar'
                    | 'az'
                    | 'bg'
                    | 'bn'
                    | 'ca'
                    | 'cs'
                    | 'cy'
                    | 'da'
                    | 'de'
                    | 'el'
                    | 'en'
                    | 'eo'
                    | 'es'
                    | 'et'
                    | 'eu'
                    | 'fa'
                    | 'fi'
                    | 'fo'
                    | 'fr'
                    | 'ga'
                    | 'gl'
                    | 'he'
                    | 'hi'
                    | 'hu'
                    | 'hy'
                    | 'id'
                    | 'is'
                    | 'it'
                    | 'ja'
                    | 'ka'
                    | 'kk'
                    | 'ko'
                    | 'ku'
                    | 'ky'
                    | 'lt'
                    | 'lv'
                    | 'mi'
                    | 'mn'
                    | 'mr'
                    | 'ms'
                    | 'mt'
                    | 'nb'
                    | 'nl'
                    | 'no'
                    | 'ns'
                    | 'pl'
                    | 'ps'
                    | 'pt'
                    | 'pt-br'
                    | 'qu'
                    | 'ro'
                    | 'ru'
                    | 'sk'
                    | 'sq'
                    | 'sv'
                    | 'sw'
                    | 'ta'
                    | 'te'
                    | 'th'
                    | 'tl'
                    | 'tn'
                    | 'tr'
                    | 'tt'
                    | 'uk'
                    | 'ur'
                    | 'uz'
                    | 'zh'
                  )[]
                | boolean
                | undefined
              queryLanguages?:
                | (
                    | 'af'
                    | 'ar'
                    | 'az'
                    | 'bg'
                    | 'bn'
                    | 'ca'
                    | 'cs'
                    | 'cy'
                    | 'da'
                    | 'de'
                    | 'el'
                    | 'en'
                    | 'eo'
                    | 'es'
                    | 'et'
                    | 'eu'
                    | 'fa'
                    | 'fi'
                    | 'fo'
                    | 'fr'
                    | 'ga'
                    | 'gl'
                    | 'he'
                    | 'hi'
                    | 'hu'
                    | 'hy'
                    | 'id'
                    | 'is'
                    | 'it'
                    | 'ja'
                    | 'ka'
                    | 'kk'
                    | 'ko'
                    | 'ku'
                    | 'ky'
                    | 'lt'
                    | 'lv'
                    | 'mi'
                    | 'mn'
                    | 'mr'
                    | 'ms'
                    | 'mt'
                    | 'nb'
                    | 'nl'
                    | 'no'
                    | 'ns'
                    | 'pl'
                    | 'ps'
                    | 'pt'
                    | 'pt-br'
                    | 'qu'
                    | 'ro'
                    | 'ru'
                    | 'sk'
                    | 'sq'
                    | 'sv'
                    | 'sw'
                    | 'ta'
                    | 'te'
                    | 'th'
                    | 'tl'
                    | 'tn'
                    | 'tr'
                    | 'tt'
                    | 'uk'
                    | 'ur'
                    | 'uz'
                    | 'zh'
                  )[]
                | undefined
              decompoundQuery?: boolean | undefined
              enableRules?: boolean | undefined
              enablePersonalization?: boolean | undefined
              queryType?: 'prefixLast' | 'prefixAll' | 'prefixNone' | undefined
              removeWordsIfNoResults?:
                | 'none'
                | 'lastWords'
                | 'firstWords'
                | 'allOptional'
                | undefined
              mode?: 'neuralSearch' | 'keywordSearch' | undefined
              semanticSearch?:
                | { eventSources?: string[] | ({ [x: string]: unknown } | null) | undefined }
                | undefined
              advancedSyntax?: boolean | undefined
              optionalWords?: string | ({ [x: string]: unknown } | null) | string[] | undefined
              disableExactOnAttributes?: string[] | undefined
              exactOnSingleWordQuery?: 'attribute' | 'none' | 'word' | undefined
              alternativesAsExact?:
                | (
                    | 'ignorePlurals'
                    | 'singleWordSynonym'
                    | 'multiWordsSynonym'
                    | 'ignoreConjugations'
                  )[]
                | undefined
              advancedSyntaxFeatures?: ('exactPhrase' | 'excludeWords')[] | undefined
              distinct?: boolean | number | undefined
              replaceSynonymsInHighlight?: boolean | undefined
              minProximity?: number | undefined
              responseFields?: string[] | undefined
              maxValuesPerFacet?: number | undefined
              sortFacetValuesBy?: string | undefined
              attributeCriteriaComputedByMinProximity?: boolean | undefined
              renderingContent?:
                | {
                    facetOrdering?:
                      | {
                          facets?: { order?: string[] | undefined } | undefined
                          values?:
                            | {
                                [x: string]: {
                                  order?: string[] | undefined
                                  sortRemainingBy?: 'count' | 'alpha' | 'hidden' | undefined
                                  hide?: string[] | undefined
                                }
                              }
                            | undefined
                        }
                      | undefined
                    redirect?: { url?: string | undefined } | undefined
                    widgets?:
                      | {
                          banners?:
                            | {
                                image?:
                                  | {
                                      urls?: { url?: string | undefined }[] | undefined
                                      title?: string | undefined
                                    }
                                  | undefined
                                link?: { url?: string | undefined } | undefined
                              }[]
                            | undefined
                        }
                      | undefined
                  }
                | undefined
              enableReRanking?: boolean | undefined
              reRankingApplyFilter?:
                | unknown[]
                | string
                | ({ [x: string]: unknown } | null)
                | undefined
              primary?: string | undefined
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { param: { indexName: string } } & { query: { getVersion?: number | undefined } }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 400
          }
        | {
            input: { param: { indexName: string } } & { query: { getVersion?: number | undefined } }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 402
          }
        | {
            input: { param: { indexName: string } } & { query: { getVersion?: number | undefined } }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 403
          }
        | {
            input: { param: { indexName: string } } & { query: { getVersion?: number | undefined } }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 404
          }
      $put:
        | {
            input: { param: { indexName: string } } & {
              query: { forwardToReplicas?: boolean | undefined }
            } & {
              json: {
                attributesForFaceting?: string[] | undefined
                replicas?: string[] | undefined
                paginationLimitedTo?: number | undefined
                unretrievableAttributes?: string[] | undefined
                disableTypoToleranceOnWords?: string[] | undefined
                attributesToTransliterate?: string[] | undefined
                camelCaseAttributes?: string[] | undefined
                decompoundedAttributes?: { [x: string]: unknown } | undefined
                indexLanguages?:
                  | (
                      | 'af'
                      | 'ar'
                      | 'az'
                      | 'bg'
                      | 'bn'
                      | 'ca'
                      | 'cs'
                      | 'cy'
                      | 'da'
                      | 'de'
                      | 'el'
                      | 'en'
                      | 'eo'
                      | 'es'
                      | 'et'
                      | 'eu'
                      | 'fa'
                      | 'fi'
                      | 'fo'
                      | 'fr'
                      | 'ga'
                      | 'gl'
                      | 'he'
                      | 'hi'
                      | 'hu'
                      | 'hy'
                      | 'id'
                      | 'is'
                      | 'it'
                      | 'ja'
                      | 'ka'
                      | 'kk'
                      | 'ko'
                      | 'ku'
                      | 'ky'
                      | 'lt'
                      | 'lv'
                      | 'mi'
                      | 'mn'
                      | 'mr'
                      | 'ms'
                      | 'mt'
                      | 'nb'
                      | 'nl'
                      | 'no'
                      | 'ns'
                      | 'pl'
                      | 'ps'
                      | 'pt'
                      | 'pt-br'
                      | 'qu'
                      | 'ro'
                      | 'ru'
                      | 'sk'
                      | 'sq'
                      | 'sv'
                      | 'sw'
                      | 'ta'
                      | 'te'
                      | 'th'
                      | 'tl'
                      | 'tn'
                      | 'tr'
                      | 'tt'
                      | 'uk'
                      | 'ur'
                      | 'uz'
                      | 'zh'
                    )[]
                  | undefined
                disablePrefixOnAttributes?: string[] | undefined
                allowCompressionOfIntegerArray?: boolean | undefined
                numericAttributesForFiltering?: string[] | undefined
                separatorsToIndex?: string | undefined
                searchableAttributes?: string[] | undefined
                userData?: { [x: string]: unknown } | undefined
                customNormalization?: { [x: string]: { [x: string]: string } } | undefined
                attributeForDistinct?: string | undefined
                maxFacetHits?: number | undefined
                keepDiacriticsOnCharacters?: string | undefined
                customRanking?: string[] | undefined
                attributesToRetrieve?: string[] | undefined
                ranking?: string[] | undefined
                relevancyStrictness?: number | undefined
                attributesToHighlight?: string[] | undefined
                attributesToSnippet?: string[] | undefined
                highlightPreTag?: string | undefined
                highlightPostTag?: string | undefined
                snippetEllipsisText?: string | undefined
                restrictHighlightAndSnippetArrays?: boolean | undefined
                hitsPerPage?: number | undefined
                minWordSizefor1Typo?: number | undefined
                minWordSizefor2Typos?: number | undefined
                typoTolerance?: boolean | 'min' | 'strict' | 'true' | 'false' | undefined
                allowTyposOnNumericTokens?: boolean | undefined
                disableTypoToleranceOnAttributes?: string[] | undefined
                ignorePlurals?:
                  | (
                      | 'af'
                      | 'ar'
                      | 'az'
                      | 'bg'
                      | 'bn'
                      | 'ca'
                      | 'cs'
                      | 'cy'
                      | 'da'
                      | 'de'
                      | 'el'
                      | 'en'
                      | 'eo'
                      | 'es'
                      | 'et'
                      | 'eu'
                      | 'fa'
                      | 'fi'
                      | 'fo'
                      | 'fr'
                      | 'ga'
                      | 'gl'
                      | 'he'
                      | 'hi'
                      | 'hu'
                      | 'hy'
                      | 'id'
                      | 'is'
                      | 'it'
                      | 'ja'
                      | 'ka'
                      | 'kk'
                      | 'ko'
                      | 'ku'
                      | 'ky'
                      | 'lt'
                      | 'lv'
                      | 'mi'
                      | 'mn'
                      | 'mr'
                      | 'ms'
                      | 'mt'
                      | 'nb'
                      | 'nl'
                      | 'no'
                      | 'ns'
                      | 'pl'
                      | 'ps'
                      | 'pt'
                      | 'pt-br'
                      | 'qu'
                      | 'ro'
                      | 'ru'
                      | 'sk'
                      | 'sq'
                      | 'sv'
                      | 'sw'
                      | 'ta'
                      | 'te'
                      | 'th'
                      | 'tl'
                      | 'tn'
                      | 'tr'
                      | 'tt'
                      | 'uk'
                      | 'ur'
                      | 'uz'
                      | 'zh'
                    )[]
                  | 'true'
                  | 'false'
                  | boolean
                  | undefined
                removeStopWords?:
                  | (
                      | 'af'
                      | 'ar'
                      | 'az'
                      | 'bg'
                      | 'bn'
                      | 'ca'
                      | 'cs'
                      | 'cy'
                      | 'da'
                      | 'de'
                      | 'el'
                      | 'en'
                      | 'eo'
                      | 'es'
                      | 'et'
                      | 'eu'
                      | 'fa'
                      | 'fi'
                      | 'fo'
                      | 'fr'
                      | 'ga'
                      | 'gl'
                      | 'he'
                      | 'hi'
                      | 'hu'
                      | 'hy'
                      | 'id'
                      | 'is'
                      | 'it'
                      | 'ja'
                      | 'ka'
                      | 'kk'
                      | 'ko'
                      | 'ku'
                      | 'ky'
                      | 'lt'
                      | 'lv'
                      | 'mi'
                      | 'mn'
                      | 'mr'
                      | 'ms'
                      | 'mt'
                      | 'nb'
                      | 'nl'
                      | 'no'
                      | 'ns'
                      | 'pl'
                      | 'ps'
                      | 'pt'
                      | 'pt-br'
                      | 'qu'
                      | 'ro'
                      | 'ru'
                      | 'sk'
                      | 'sq'
                      | 'sv'
                      | 'sw'
                      | 'ta'
                      | 'te'
                      | 'th'
                      | 'tl'
                      | 'tn'
                      | 'tr'
                      | 'tt'
                      | 'uk'
                      | 'ur'
                      | 'uz'
                      | 'zh'
                    )[]
                  | boolean
                  | undefined
                queryLanguages?:
                  | (
                      | 'af'
                      | 'ar'
                      | 'az'
                      | 'bg'
                      | 'bn'
                      | 'ca'
                      | 'cs'
                      | 'cy'
                      | 'da'
                      | 'de'
                      | 'el'
                      | 'en'
                      | 'eo'
                      | 'es'
                      | 'et'
                      | 'eu'
                      | 'fa'
                      | 'fi'
                      | 'fo'
                      | 'fr'
                      | 'ga'
                      | 'gl'
                      | 'he'
                      | 'hi'
                      | 'hu'
                      | 'hy'
                      | 'id'
                      | 'is'
                      | 'it'
                      | 'ja'
                      | 'ka'
                      | 'kk'
                      | 'ko'
                      | 'ku'
                      | 'ky'
                      | 'lt'
                      | 'lv'
                      | 'mi'
                      | 'mn'
                      | 'mr'
                      | 'ms'
                      | 'mt'
                      | 'nb'
                      | 'nl'
                      | 'no'
                      | 'ns'
                      | 'pl'
                      | 'ps'
                      | 'pt'
                      | 'pt-br'
                      | 'qu'
                      | 'ro'
                      | 'ru'
                      | 'sk'
                      | 'sq'
                      | 'sv'
                      | 'sw'
                      | 'ta'
                      | 'te'
                      | 'th'
                      | 'tl'
                      | 'tn'
                      | 'tr'
                      | 'tt'
                      | 'uk'
                      | 'ur'
                      | 'uz'
                      | 'zh'
                    )[]
                  | undefined
                decompoundQuery?: boolean | undefined
                enableRules?: boolean | undefined
                enablePersonalization?: boolean | undefined
                queryType?: 'prefixLast' | 'prefixAll' | 'prefixNone' | undefined
                removeWordsIfNoResults?:
                  | 'none'
                  | 'lastWords'
                  | 'firstWords'
                  | 'allOptional'
                  | undefined
                mode?: 'neuralSearch' | 'keywordSearch' | undefined
                semanticSearch?:
                  | { eventSources?: string[] | ({ [x: string]: unknown } | null) | undefined }
                  | undefined
                advancedSyntax?: boolean | undefined
                optionalWords?: string | ({ [x: string]: unknown } | null) | string[] | undefined
                disableExactOnAttributes?: string[] | undefined
                exactOnSingleWordQuery?: 'attribute' | 'none' | 'word' | undefined
                alternativesAsExact?:
                  | (
                      | 'ignorePlurals'
                      | 'singleWordSynonym'
                      | 'multiWordsSynonym'
                      | 'ignoreConjugations'
                    )[]
                  | undefined
                advancedSyntaxFeatures?: ('exactPhrase' | 'excludeWords')[] | undefined
                distinct?: boolean | number | undefined
                replaceSynonymsInHighlight?: boolean | undefined
                minProximity?: number | undefined
                responseFields?: string[] | undefined
                maxValuesPerFacet?: number | undefined
                sortFacetValuesBy?: string | undefined
                attributeCriteriaComputedByMinProximity?: boolean | undefined
                renderingContent?:
                  | {
                      facetOrdering?:
                        | {
                            facets?: { order?: string[] | undefined } | undefined
                            values?:
                              | {
                                  [x: string]: {
                                    order?: string[] | undefined
                                    sortRemainingBy?: 'count' | 'alpha' | 'hidden' | undefined
                                    hide?: string[] | undefined
                                  }
                                }
                              | undefined
                          }
                        | undefined
                      redirect?: { url?: string | undefined } | undefined
                      widgets?:
                        | {
                            banners?:
                              | {
                                  image?:
                                    | {
                                        urls?: { url?: string | undefined }[] | undefined
                                        title?: string | undefined
                                      }
                                    | undefined
                                  link?: { url?: string | undefined } | undefined
                                }[]
                              | undefined
                          }
                        | undefined
                    }
                  | undefined
                enableReRanking?: boolean | undefined
                reRankingApplyFilter?:
                  | unknown[]
                  | string
                  | ({ [x: string]: unknown } | null)
                  | undefined
              }
            }
            output: { taskID: bigint; updatedAt: string }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { param: { indexName: string } } & {
              query: { forwardToReplicas?: boolean | undefined }
            } & {
              json: {
                attributesForFaceting?: string[] | undefined
                replicas?: string[] | undefined
                paginationLimitedTo?: number | undefined
                unretrievableAttributes?: string[] | undefined
                disableTypoToleranceOnWords?: string[] | undefined
                attributesToTransliterate?: string[] | undefined
                camelCaseAttributes?: string[] | undefined
                decompoundedAttributes?: { [x: string]: unknown } | undefined
                indexLanguages?:
                  | (
                      | 'af'
                      | 'ar'
                      | 'az'
                      | 'bg'
                      | 'bn'
                      | 'ca'
                      | 'cs'
                      | 'cy'
                      | 'da'
                      | 'de'
                      | 'el'
                      | 'en'
                      | 'eo'
                      | 'es'
                      | 'et'
                      | 'eu'
                      | 'fa'
                      | 'fi'
                      | 'fo'
                      | 'fr'
                      | 'ga'
                      | 'gl'
                      | 'he'
                      | 'hi'
                      | 'hu'
                      | 'hy'
                      | 'id'
                      | 'is'
                      | 'it'
                      | 'ja'
                      | 'ka'
                      | 'kk'
                      | 'ko'
                      | 'ku'
                      | 'ky'
                      | 'lt'
                      | 'lv'
                      | 'mi'
                      | 'mn'
                      | 'mr'
                      | 'ms'
                      | 'mt'
                      | 'nb'
                      | 'nl'
                      | 'no'
                      | 'ns'
                      | 'pl'
                      | 'ps'
                      | 'pt'
                      | 'pt-br'
                      | 'qu'
                      | 'ro'
                      | 'ru'
                      | 'sk'
                      | 'sq'
                      | 'sv'
                      | 'sw'
                      | 'ta'
                      | 'te'
                      | 'th'
                      | 'tl'
                      | 'tn'
                      | 'tr'
                      | 'tt'
                      | 'uk'
                      | 'ur'
                      | 'uz'
                      | 'zh'
                    )[]
                  | undefined
                disablePrefixOnAttributes?: string[] | undefined
                allowCompressionOfIntegerArray?: boolean | undefined
                numericAttributesForFiltering?: string[] | undefined
                separatorsToIndex?: string | undefined
                searchableAttributes?: string[] | undefined
                userData?: { [x: string]: unknown } | undefined
                customNormalization?: { [x: string]: { [x: string]: string } } | undefined
                attributeForDistinct?: string | undefined
                maxFacetHits?: number | undefined
                keepDiacriticsOnCharacters?: string | undefined
                customRanking?: string[] | undefined
                attributesToRetrieve?: string[] | undefined
                ranking?: string[] | undefined
                relevancyStrictness?: number | undefined
                attributesToHighlight?: string[] | undefined
                attributesToSnippet?: string[] | undefined
                highlightPreTag?: string | undefined
                highlightPostTag?: string | undefined
                snippetEllipsisText?: string | undefined
                restrictHighlightAndSnippetArrays?: boolean | undefined
                hitsPerPage?: number | undefined
                minWordSizefor1Typo?: number | undefined
                minWordSizefor2Typos?: number | undefined
                typoTolerance?: boolean | 'min' | 'strict' | 'true' | 'false' | undefined
                allowTyposOnNumericTokens?: boolean | undefined
                disableTypoToleranceOnAttributes?: string[] | undefined
                ignorePlurals?:
                  | (
                      | 'af'
                      | 'ar'
                      | 'az'
                      | 'bg'
                      | 'bn'
                      | 'ca'
                      | 'cs'
                      | 'cy'
                      | 'da'
                      | 'de'
                      | 'el'
                      | 'en'
                      | 'eo'
                      | 'es'
                      | 'et'
                      | 'eu'
                      | 'fa'
                      | 'fi'
                      | 'fo'
                      | 'fr'
                      | 'ga'
                      | 'gl'
                      | 'he'
                      | 'hi'
                      | 'hu'
                      | 'hy'
                      | 'id'
                      | 'is'
                      | 'it'
                      | 'ja'
                      | 'ka'
                      | 'kk'
                      | 'ko'
                      | 'ku'
                      | 'ky'
                      | 'lt'
                      | 'lv'
                      | 'mi'
                      | 'mn'
                      | 'mr'
                      | 'ms'
                      | 'mt'
                      | 'nb'
                      | 'nl'
                      | 'no'
                      | 'ns'
                      | 'pl'
                      | 'ps'
                      | 'pt'
                      | 'pt-br'
                      | 'qu'
                      | 'ro'
                      | 'ru'
                      | 'sk'
                      | 'sq'
                      | 'sv'
                      | 'sw'
                      | 'ta'
                      | 'te'
                      | 'th'
                      | 'tl'
                      | 'tn'
                      | 'tr'
                      | 'tt'
                      | 'uk'
                      | 'ur'
                      | 'uz'
                      | 'zh'
                    )[]
                  | 'true'
                  | 'false'
                  | boolean
                  | undefined
                removeStopWords?:
                  | (
                      | 'af'
                      | 'ar'
                      | 'az'
                      | 'bg'
                      | 'bn'
                      | 'ca'
                      | 'cs'
                      | 'cy'
                      | 'da'
                      | 'de'
                      | 'el'
                      | 'en'
                      | 'eo'
                      | 'es'
                      | 'et'
                      | 'eu'
                      | 'fa'
                      | 'fi'
                      | 'fo'
                      | 'fr'
                      | 'ga'
                      | 'gl'
                      | 'he'
                      | 'hi'
                      | 'hu'
                      | 'hy'
                      | 'id'
                      | 'is'
                      | 'it'
                      | 'ja'
                      | 'ka'
                      | 'kk'
                      | 'ko'
                      | 'ku'
                      | 'ky'
                      | 'lt'
                      | 'lv'
                      | 'mi'
                      | 'mn'
                      | 'mr'
                      | 'ms'
                      | 'mt'
                      | 'nb'
                      | 'nl'
                      | 'no'
                      | 'ns'
                      | 'pl'
                      | 'ps'
                      | 'pt'
                      | 'pt-br'
                      | 'qu'
                      | 'ro'
                      | 'ru'
                      | 'sk'
                      | 'sq'
                      | 'sv'
                      | 'sw'
                      | 'ta'
                      | 'te'
                      | 'th'
                      | 'tl'
                      | 'tn'
                      | 'tr'
                      | 'tt'
                      | 'uk'
                      | 'ur'
                      | 'uz'
                      | 'zh'
                    )[]
                  | boolean
                  | undefined
                queryLanguages?:
                  | (
                      | 'af'
                      | 'ar'
                      | 'az'
                      | 'bg'
                      | 'bn'
                      | 'ca'
                      | 'cs'
                      | 'cy'
                      | 'da'
                      | 'de'
                      | 'el'
                      | 'en'
                      | 'eo'
                      | 'es'
                      | 'et'
                      | 'eu'
                      | 'fa'
                      | 'fi'
                      | 'fo'
                      | 'fr'
                      | 'ga'
                      | 'gl'
                      | 'he'
                      | 'hi'
                      | 'hu'
                      | 'hy'
                      | 'id'
                      | 'is'
                      | 'it'
                      | 'ja'
                      | 'ka'
                      | 'kk'
                      | 'ko'
                      | 'ku'
                      | 'ky'
                      | 'lt'
                      | 'lv'
                      | 'mi'
                      | 'mn'
                      | 'mr'
                      | 'ms'
                      | 'mt'
                      | 'nb'
                      | 'nl'
                      | 'no'
                      | 'ns'
                      | 'pl'
                      | 'ps'
                      | 'pt'
                      | 'pt-br'
                      | 'qu'
                      | 'ro'
                      | 'ru'
                      | 'sk'
                      | 'sq'
                      | 'sv'
                      | 'sw'
                      | 'ta'
                      | 'te'
                      | 'th'
                      | 'tl'
                      | 'tn'
                      | 'tr'
                      | 'tt'
                      | 'uk'
                      | 'ur'
                      | 'uz'
                      | 'zh'
                    )[]
                  | undefined
                decompoundQuery?: boolean | undefined
                enableRules?: boolean | undefined
                enablePersonalization?: boolean | undefined
                queryType?: 'prefixLast' | 'prefixAll' | 'prefixNone' | undefined
                removeWordsIfNoResults?:
                  | 'none'
                  | 'lastWords'
                  | 'firstWords'
                  | 'allOptional'
                  | undefined
                mode?: 'neuralSearch' | 'keywordSearch' | undefined
                semanticSearch?:
                  | { eventSources?: string[] | ({ [x: string]: unknown } | null) | undefined }
                  | undefined
                advancedSyntax?: boolean | undefined
                optionalWords?: string | ({ [x: string]: unknown } | null) | string[] | undefined
                disableExactOnAttributes?: string[] | undefined
                exactOnSingleWordQuery?: 'attribute' | 'none' | 'word' | undefined
                alternativesAsExact?:
                  | (
                      | 'ignorePlurals'
                      | 'singleWordSynonym'
                      | 'multiWordsSynonym'
                      | 'ignoreConjugations'
                    )[]
                  | undefined
                advancedSyntaxFeatures?: ('exactPhrase' | 'excludeWords')[] | undefined
                distinct?: boolean | number | undefined
                replaceSynonymsInHighlight?: boolean | undefined
                minProximity?: number | undefined
                responseFields?: string[] | undefined
                maxValuesPerFacet?: number | undefined
                sortFacetValuesBy?: string | undefined
                attributeCriteriaComputedByMinProximity?: boolean | undefined
                renderingContent?:
                  | {
                      facetOrdering?:
                        | {
                            facets?: { order?: string[] | undefined } | undefined
                            values?:
                              | {
                                  [x: string]: {
                                    order?: string[] | undefined
                                    sortRemainingBy?: 'count' | 'alpha' | 'hidden' | undefined
                                    hide?: string[] | undefined
                                  }
                                }
                              | undefined
                          }
                        | undefined
                      redirect?: { url?: string | undefined } | undefined
                      widgets?:
                        | {
                            banners?:
                              | {
                                  image?:
                                    | {
                                        urls?: { url?: string | undefined }[] | undefined
                                        title?: string | undefined
                                      }
                                    | undefined
                                  link?: { url?: string | undefined } | undefined
                                }[]
                              | undefined
                          }
                        | undefined
                    }
                  | undefined
                enableReRanking?: boolean | undefined
                reRankingApplyFilter?:
                  | unknown[]
                  | string
                  | ({ [x: string]: unknown } | null)
                  | undefined
              }
            }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 400
          }
        | {
            input: { param: { indexName: string } } & {
              query: { forwardToReplicas?: boolean | undefined }
            } & {
              json: {
                attributesForFaceting?: string[] | undefined
                replicas?: string[] | undefined
                paginationLimitedTo?: number | undefined
                unretrievableAttributes?: string[] | undefined
                disableTypoToleranceOnWords?: string[] | undefined
                attributesToTransliterate?: string[] | undefined
                camelCaseAttributes?: string[] | undefined
                decompoundedAttributes?: { [x: string]: unknown } | undefined
                indexLanguages?:
                  | (
                      | 'af'
                      | 'ar'
                      | 'az'
                      | 'bg'
                      | 'bn'
                      | 'ca'
                      | 'cs'
                      | 'cy'
                      | 'da'
                      | 'de'
                      | 'el'
                      | 'en'
                      | 'eo'
                      | 'es'
                      | 'et'
                      | 'eu'
                      | 'fa'
                      | 'fi'
                      | 'fo'
                      | 'fr'
                      | 'ga'
                      | 'gl'
                      | 'he'
                      | 'hi'
                      | 'hu'
                      | 'hy'
                      | 'id'
                      | 'is'
                      | 'it'
                      | 'ja'
                      | 'ka'
                      | 'kk'
                      | 'ko'
                      | 'ku'
                      | 'ky'
                      | 'lt'
                      | 'lv'
                      | 'mi'
                      | 'mn'
                      | 'mr'
                      | 'ms'
                      | 'mt'
                      | 'nb'
                      | 'nl'
                      | 'no'
                      | 'ns'
                      | 'pl'
                      | 'ps'
                      | 'pt'
                      | 'pt-br'
                      | 'qu'
                      | 'ro'
                      | 'ru'
                      | 'sk'
                      | 'sq'
                      | 'sv'
                      | 'sw'
                      | 'ta'
                      | 'te'
                      | 'th'
                      | 'tl'
                      | 'tn'
                      | 'tr'
                      | 'tt'
                      | 'uk'
                      | 'ur'
                      | 'uz'
                      | 'zh'
                    )[]
                  | undefined
                disablePrefixOnAttributes?: string[] | undefined
                allowCompressionOfIntegerArray?: boolean | undefined
                numericAttributesForFiltering?: string[] | undefined
                separatorsToIndex?: string | undefined
                searchableAttributes?: string[] | undefined
                userData?: { [x: string]: unknown } | undefined
                customNormalization?: { [x: string]: { [x: string]: string } } | undefined
                attributeForDistinct?: string | undefined
                maxFacetHits?: number | undefined
                keepDiacriticsOnCharacters?: string | undefined
                customRanking?: string[] | undefined
                attributesToRetrieve?: string[] | undefined
                ranking?: string[] | undefined
                relevancyStrictness?: number | undefined
                attributesToHighlight?: string[] | undefined
                attributesToSnippet?: string[] | undefined
                highlightPreTag?: string | undefined
                highlightPostTag?: string | undefined
                snippetEllipsisText?: string | undefined
                restrictHighlightAndSnippetArrays?: boolean | undefined
                hitsPerPage?: number | undefined
                minWordSizefor1Typo?: number | undefined
                minWordSizefor2Typos?: number | undefined
                typoTolerance?: boolean | 'min' | 'strict' | 'true' | 'false' | undefined
                allowTyposOnNumericTokens?: boolean | undefined
                disableTypoToleranceOnAttributes?: string[] | undefined
                ignorePlurals?:
                  | (
                      | 'af'
                      | 'ar'
                      | 'az'
                      | 'bg'
                      | 'bn'
                      | 'ca'
                      | 'cs'
                      | 'cy'
                      | 'da'
                      | 'de'
                      | 'el'
                      | 'en'
                      | 'eo'
                      | 'es'
                      | 'et'
                      | 'eu'
                      | 'fa'
                      | 'fi'
                      | 'fo'
                      | 'fr'
                      | 'ga'
                      | 'gl'
                      | 'he'
                      | 'hi'
                      | 'hu'
                      | 'hy'
                      | 'id'
                      | 'is'
                      | 'it'
                      | 'ja'
                      | 'ka'
                      | 'kk'
                      | 'ko'
                      | 'ku'
                      | 'ky'
                      | 'lt'
                      | 'lv'
                      | 'mi'
                      | 'mn'
                      | 'mr'
                      | 'ms'
                      | 'mt'
                      | 'nb'
                      | 'nl'
                      | 'no'
                      | 'ns'
                      | 'pl'
                      | 'ps'
                      | 'pt'
                      | 'pt-br'
                      | 'qu'
                      | 'ro'
                      | 'ru'
                      | 'sk'
                      | 'sq'
                      | 'sv'
                      | 'sw'
                      | 'ta'
                      | 'te'
                      | 'th'
                      | 'tl'
                      | 'tn'
                      | 'tr'
                      | 'tt'
                      | 'uk'
                      | 'ur'
                      | 'uz'
                      | 'zh'
                    )[]
                  | 'true'
                  | 'false'
                  | boolean
                  | undefined
                removeStopWords?:
                  | (
                      | 'af'
                      | 'ar'
                      | 'az'
                      | 'bg'
                      | 'bn'
                      | 'ca'
                      | 'cs'
                      | 'cy'
                      | 'da'
                      | 'de'
                      | 'el'
                      | 'en'
                      | 'eo'
                      | 'es'
                      | 'et'
                      | 'eu'
                      | 'fa'
                      | 'fi'
                      | 'fo'
                      | 'fr'
                      | 'ga'
                      | 'gl'
                      | 'he'
                      | 'hi'
                      | 'hu'
                      | 'hy'
                      | 'id'
                      | 'is'
                      | 'it'
                      | 'ja'
                      | 'ka'
                      | 'kk'
                      | 'ko'
                      | 'ku'
                      | 'ky'
                      | 'lt'
                      | 'lv'
                      | 'mi'
                      | 'mn'
                      | 'mr'
                      | 'ms'
                      | 'mt'
                      | 'nb'
                      | 'nl'
                      | 'no'
                      | 'ns'
                      | 'pl'
                      | 'ps'
                      | 'pt'
                      | 'pt-br'
                      | 'qu'
                      | 'ro'
                      | 'ru'
                      | 'sk'
                      | 'sq'
                      | 'sv'
                      | 'sw'
                      | 'ta'
                      | 'te'
                      | 'th'
                      | 'tl'
                      | 'tn'
                      | 'tr'
                      | 'tt'
                      | 'uk'
                      | 'ur'
                      | 'uz'
                      | 'zh'
                    )[]
                  | boolean
                  | undefined
                queryLanguages?:
                  | (
                      | 'af'
                      | 'ar'
                      | 'az'
                      | 'bg'
                      | 'bn'
                      | 'ca'
                      | 'cs'
                      | 'cy'
                      | 'da'
                      | 'de'
                      | 'el'
                      | 'en'
                      | 'eo'
                      | 'es'
                      | 'et'
                      | 'eu'
                      | 'fa'
                      | 'fi'
                      | 'fo'
                      | 'fr'
                      | 'ga'
                      | 'gl'
                      | 'he'
                      | 'hi'
                      | 'hu'
                      | 'hy'
                      | 'id'
                      | 'is'
                      | 'it'
                      | 'ja'
                      | 'ka'
                      | 'kk'
                      | 'ko'
                      | 'ku'
                      | 'ky'
                      | 'lt'
                      | 'lv'
                      | 'mi'
                      | 'mn'
                      | 'mr'
                      | 'ms'
                      | 'mt'
                      | 'nb'
                      | 'nl'
                      | 'no'
                      | 'ns'
                      | 'pl'
                      | 'ps'
                      | 'pt'
                      | 'pt-br'
                      | 'qu'
                      | 'ro'
                      | 'ru'
                      | 'sk'
                      | 'sq'
                      | 'sv'
                      | 'sw'
                      | 'ta'
                      | 'te'
                      | 'th'
                      | 'tl'
                      | 'tn'
                      | 'tr'
                      | 'tt'
                      | 'uk'
                      | 'ur'
                      | 'uz'
                      | 'zh'
                    )[]
                  | undefined
                decompoundQuery?: boolean | undefined
                enableRules?: boolean | undefined
                enablePersonalization?: boolean | undefined
                queryType?: 'prefixLast' | 'prefixAll' | 'prefixNone' | undefined
                removeWordsIfNoResults?:
                  | 'none'
                  | 'lastWords'
                  | 'firstWords'
                  | 'allOptional'
                  | undefined
                mode?: 'neuralSearch' | 'keywordSearch' | undefined
                semanticSearch?:
                  | { eventSources?: string[] | ({ [x: string]: unknown } | null) | undefined }
                  | undefined
                advancedSyntax?: boolean | undefined
                optionalWords?: string | ({ [x: string]: unknown } | null) | string[] | undefined
                disableExactOnAttributes?: string[] | undefined
                exactOnSingleWordQuery?: 'attribute' | 'none' | 'word' | undefined
                alternativesAsExact?:
                  | (
                      | 'ignorePlurals'
                      | 'singleWordSynonym'
                      | 'multiWordsSynonym'
                      | 'ignoreConjugations'
                    )[]
                  | undefined
                advancedSyntaxFeatures?: ('exactPhrase' | 'excludeWords')[] | undefined
                distinct?: boolean | number | undefined
                replaceSynonymsInHighlight?: boolean | undefined
                minProximity?: number | undefined
                responseFields?: string[] | undefined
                maxValuesPerFacet?: number | undefined
                sortFacetValuesBy?: string | undefined
                attributeCriteriaComputedByMinProximity?: boolean | undefined
                renderingContent?:
                  | {
                      facetOrdering?:
                        | {
                            facets?: { order?: string[] | undefined } | undefined
                            values?:
                              | {
                                  [x: string]: {
                                    order?: string[] | undefined
                                    sortRemainingBy?: 'count' | 'alpha' | 'hidden' | undefined
                                    hide?: string[] | undefined
                                  }
                                }
                              | undefined
                          }
                        | undefined
                      redirect?: { url?: string | undefined } | undefined
                      widgets?:
                        | {
                            banners?:
                              | {
                                  image?:
                                    | {
                                        urls?: { url?: string | undefined }[] | undefined
                                        title?: string | undefined
                                      }
                                    | undefined
                                  link?: { url?: string | undefined } | undefined
                                }[]
                              | undefined
                          }
                        | undefined
                    }
                  | undefined
                enableReRanking?: boolean | undefined
                reRankingApplyFilter?:
                  | unknown[]
                  | string
                  | ({ [x: string]: unknown } | null)
                  | undefined
              }
            }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 402
          }
        | {
            input: { param: { indexName: string } } & {
              query: { forwardToReplicas?: boolean | undefined }
            } & {
              json: {
                attributesForFaceting?: string[] | undefined
                replicas?: string[] | undefined
                paginationLimitedTo?: number | undefined
                unretrievableAttributes?: string[] | undefined
                disableTypoToleranceOnWords?: string[] | undefined
                attributesToTransliterate?: string[] | undefined
                camelCaseAttributes?: string[] | undefined
                decompoundedAttributes?: { [x: string]: unknown } | undefined
                indexLanguages?:
                  | (
                      | 'af'
                      | 'ar'
                      | 'az'
                      | 'bg'
                      | 'bn'
                      | 'ca'
                      | 'cs'
                      | 'cy'
                      | 'da'
                      | 'de'
                      | 'el'
                      | 'en'
                      | 'eo'
                      | 'es'
                      | 'et'
                      | 'eu'
                      | 'fa'
                      | 'fi'
                      | 'fo'
                      | 'fr'
                      | 'ga'
                      | 'gl'
                      | 'he'
                      | 'hi'
                      | 'hu'
                      | 'hy'
                      | 'id'
                      | 'is'
                      | 'it'
                      | 'ja'
                      | 'ka'
                      | 'kk'
                      | 'ko'
                      | 'ku'
                      | 'ky'
                      | 'lt'
                      | 'lv'
                      | 'mi'
                      | 'mn'
                      | 'mr'
                      | 'ms'
                      | 'mt'
                      | 'nb'
                      | 'nl'
                      | 'no'
                      | 'ns'
                      | 'pl'
                      | 'ps'
                      | 'pt'
                      | 'pt-br'
                      | 'qu'
                      | 'ro'
                      | 'ru'
                      | 'sk'
                      | 'sq'
                      | 'sv'
                      | 'sw'
                      | 'ta'
                      | 'te'
                      | 'th'
                      | 'tl'
                      | 'tn'
                      | 'tr'
                      | 'tt'
                      | 'uk'
                      | 'ur'
                      | 'uz'
                      | 'zh'
                    )[]
                  | undefined
                disablePrefixOnAttributes?: string[] | undefined
                allowCompressionOfIntegerArray?: boolean | undefined
                numericAttributesForFiltering?: string[] | undefined
                separatorsToIndex?: string | undefined
                searchableAttributes?: string[] | undefined
                userData?: { [x: string]: unknown } | undefined
                customNormalization?: { [x: string]: { [x: string]: string } } | undefined
                attributeForDistinct?: string | undefined
                maxFacetHits?: number | undefined
                keepDiacriticsOnCharacters?: string | undefined
                customRanking?: string[] | undefined
                attributesToRetrieve?: string[] | undefined
                ranking?: string[] | undefined
                relevancyStrictness?: number | undefined
                attributesToHighlight?: string[] | undefined
                attributesToSnippet?: string[] | undefined
                highlightPreTag?: string | undefined
                highlightPostTag?: string | undefined
                snippetEllipsisText?: string | undefined
                restrictHighlightAndSnippetArrays?: boolean | undefined
                hitsPerPage?: number | undefined
                minWordSizefor1Typo?: number | undefined
                minWordSizefor2Typos?: number | undefined
                typoTolerance?: boolean | 'min' | 'strict' | 'true' | 'false' | undefined
                allowTyposOnNumericTokens?: boolean | undefined
                disableTypoToleranceOnAttributes?: string[] | undefined
                ignorePlurals?:
                  | (
                      | 'af'
                      | 'ar'
                      | 'az'
                      | 'bg'
                      | 'bn'
                      | 'ca'
                      | 'cs'
                      | 'cy'
                      | 'da'
                      | 'de'
                      | 'el'
                      | 'en'
                      | 'eo'
                      | 'es'
                      | 'et'
                      | 'eu'
                      | 'fa'
                      | 'fi'
                      | 'fo'
                      | 'fr'
                      | 'ga'
                      | 'gl'
                      | 'he'
                      | 'hi'
                      | 'hu'
                      | 'hy'
                      | 'id'
                      | 'is'
                      | 'it'
                      | 'ja'
                      | 'ka'
                      | 'kk'
                      | 'ko'
                      | 'ku'
                      | 'ky'
                      | 'lt'
                      | 'lv'
                      | 'mi'
                      | 'mn'
                      | 'mr'
                      | 'ms'
                      | 'mt'
                      | 'nb'
                      | 'nl'
                      | 'no'
                      | 'ns'
                      | 'pl'
                      | 'ps'
                      | 'pt'
                      | 'pt-br'
                      | 'qu'
                      | 'ro'
                      | 'ru'
                      | 'sk'
                      | 'sq'
                      | 'sv'
                      | 'sw'
                      | 'ta'
                      | 'te'
                      | 'th'
                      | 'tl'
                      | 'tn'
                      | 'tr'
                      | 'tt'
                      | 'uk'
                      | 'ur'
                      | 'uz'
                      | 'zh'
                    )[]
                  | 'true'
                  | 'false'
                  | boolean
                  | undefined
                removeStopWords?:
                  | (
                      | 'af'
                      | 'ar'
                      | 'az'
                      | 'bg'
                      | 'bn'
                      | 'ca'
                      | 'cs'
                      | 'cy'
                      | 'da'
                      | 'de'
                      | 'el'
                      | 'en'
                      | 'eo'
                      | 'es'
                      | 'et'
                      | 'eu'
                      | 'fa'
                      | 'fi'
                      | 'fo'
                      | 'fr'
                      | 'ga'
                      | 'gl'
                      | 'he'
                      | 'hi'
                      | 'hu'
                      | 'hy'
                      | 'id'
                      | 'is'
                      | 'it'
                      | 'ja'
                      | 'ka'
                      | 'kk'
                      | 'ko'
                      | 'ku'
                      | 'ky'
                      | 'lt'
                      | 'lv'
                      | 'mi'
                      | 'mn'
                      | 'mr'
                      | 'ms'
                      | 'mt'
                      | 'nb'
                      | 'nl'
                      | 'no'
                      | 'ns'
                      | 'pl'
                      | 'ps'
                      | 'pt'
                      | 'pt-br'
                      | 'qu'
                      | 'ro'
                      | 'ru'
                      | 'sk'
                      | 'sq'
                      | 'sv'
                      | 'sw'
                      | 'ta'
                      | 'te'
                      | 'th'
                      | 'tl'
                      | 'tn'
                      | 'tr'
                      | 'tt'
                      | 'uk'
                      | 'ur'
                      | 'uz'
                      | 'zh'
                    )[]
                  | boolean
                  | undefined
                queryLanguages?:
                  | (
                      | 'af'
                      | 'ar'
                      | 'az'
                      | 'bg'
                      | 'bn'
                      | 'ca'
                      | 'cs'
                      | 'cy'
                      | 'da'
                      | 'de'
                      | 'el'
                      | 'en'
                      | 'eo'
                      | 'es'
                      | 'et'
                      | 'eu'
                      | 'fa'
                      | 'fi'
                      | 'fo'
                      | 'fr'
                      | 'ga'
                      | 'gl'
                      | 'he'
                      | 'hi'
                      | 'hu'
                      | 'hy'
                      | 'id'
                      | 'is'
                      | 'it'
                      | 'ja'
                      | 'ka'
                      | 'kk'
                      | 'ko'
                      | 'ku'
                      | 'ky'
                      | 'lt'
                      | 'lv'
                      | 'mi'
                      | 'mn'
                      | 'mr'
                      | 'ms'
                      | 'mt'
                      | 'nb'
                      | 'nl'
                      | 'no'
                      | 'ns'
                      | 'pl'
                      | 'ps'
                      | 'pt'
                      | 'pt-br'
                      | 'qu'
                      | 'ro'
                      | 'ru'
                      | 'sk'
                      | 'sq'
                      | 'sv'
                      | 'sw'
                      | 'ta'
                      | 'te'
                      | 'th'
                      | 'tl'
                      | 'tn'
                      | 'tr'
                      | 'tt'
                      | 'uk'
                      | 'ur'
                      | 'uz'
                      | 'zh'
                    )[]
                  | undefined
                decompoundQuery?: boolean | undefined
                enableRules?: boolean | undefined
                enablePersonalization?: boolean | undefined
                queryType?: 'prefixLast' | 'prefixAll' | 'prefixNone' | undefined
                removeWordsIfNoResults?:
                  | 'none'
                  | 'lastWords'
                  | 'firstWords'
                  | 'allOptional'
                  | undefined
                mode?: 'neuralSearch' | 'keywordSearch' | undefined
                semanticSearch?:
                  | { eventSources?: string[] | ({ [x: string]: unknown } | null) | undefined }
                  | undefined
                advancedSyntax?: boolean | undefined
                optionalWords?: string | ({ [x: string]: unknown } | null) | string[] | undefined
                disableExactOnAttributes?: string[] | undefined
                exactOnSingleWordQuery?: 'attribute' | 'none' | 'word' | undefined
                alternativesAsExact?:
                  | (
                      | 'ignorePlurals'
                      | 'singleWordSynonym'
                      | 'multiWordsSynonym'
                      | 'ignoreConjugations'
                    )[]
                  | undefined
                advancedSyntaxFeatures?: ('exactPhrase' | 'excludeWords')[] | undefined
                distinct?: boolean | number | undefined
                replaceSynonymsInHighlight?: boolean | undefined
                minProximity?: number | undefined
                responseFields?: string[] | undefined
                maxValuesPerFacet?: number | undefined
                sortFacetValuesBy?: string | undefined
                attributeCriteriaComputedByMinProximity?: boolean | undefined
                renderingContent?:
                  | {
                      facetOrdering?:
                        | {
                            facets?: { order?: string[] | undefined } | undefined
                            values?:
                              | {
                                  [x: string]: {
                                    order?: string[] | undefined
                                    sortRemainingBy?: 'count' | 'alpha' | 'hidden' | undefined
                                    hide?: string[] | undefined
                                  }
                                }
                              | undefined
                          }
                        | undefined
                      redirect?: { url?: string | undefined } | undefined
                      widgets?:
                        | {
                            banners?:
                              | {
                                  image?:
                                    | {
                                        urls?: { url?: string | undefined }[] | undefined
                                        title?: string | undefined
                                      }
                                    | undefined
                                  link?: { url?: string | undefined } | undefined
                                }[]
                              | undefined
                          }
                        | undefined
                    }
                  | undefined
                enableReRanking?: boolean | undefined
                reRankingApplyFilter?:
                  | unknown[]
                  | string
                  | ({ [x: string]: unknown } | null)
                  | undefined
              }
            }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 403
          }
        | {
            input: { param: { indexName: string } } & {
              query: { forwardToReplicas?: boolean | undefined }
            } & {
              json: {
                attributesForFaceting?: string[] | undefined
                replicas?: string[] | undefined
                paginationLimitedTo?: number | undefined
                unretrievableAttributes?: string[] | undefined
                disableTypoToleranceOnWords?: string[] | undefined
                attributesToTransliterate?: string[] | undefined
                camelCaseAttributes?: string[] | undefined
                decompoundedAttributes?: { [x: string]: unknown } | undefined
                indexLanguages?:
                  | (
                      | 'af'
                      | 'ar'
                      | 'az'
                      | 'bg'
                      | 'bn'
                      | 'ca'
                      | 'cs'
                      | 'cy'
                      | 'da'
                      | 'de'
                      | 'el'
                      | 'en'
                      | 'eo'
                      | 'es'
                      | 'et'
                      | 'eu'
                      | 'fa'
                      | 'fi'
                      | 'fo'
                      | 'fr'
                      | 'ga'
                      | 'gl'
                      | 'he'
                      | 'hi'
                      | 'hu'
                      | 'hy'
                      | 'id'
                      | 'is'
                      | 'it'
                      | 'ja'
                      | 'ka'
                      | 'kk'
                      | 'ko'
                      | 'ku'
                      | 'ky'
                      | 'lt'
                      | 'lv'
                      | 'mi'
                      | 'mn'
                      | 'mr'
                      | 'ms'
                      | 'mt'
                      | 'nb'
                      | 'nl'
                      | 'no'
                      | 'ns'
                      | 'pl'
                      | 'ps'
                      | 'pt'
                      | 'pt-br'
                      | 'qu'
                      | 'ro'
                      | 'ru'
                      | 'sk'
                      | 'sq'
                      | 'sv'
                      | 'sw'
                      | 'ta'
                      | 'te'
                      | 'th'
                      | 'tl'
                      | 'tn'
                      | 'tr'
                      | 'tt'
                      | 'uk'
                      | 'ur'
                      | 'uz'
                      | 'zh'
                    )[]
                  | undefined
                disablePrefixOnAttributes?: string[] | undefined
                allowCompressionOfIntegerArray?: boolean | undefined
                numericAttributesForFiltering?: string[] | undefined
                separatorsToIndex?: string | undefined
                searchableAttributes?: string[] | undefined
                userData?: { [x: string]: unknown } | undefined
                customNormalization?: { [x: string]: { [x: string]: string } } | undefined
                attributeForDistinct?: string | undefined
                maxFacetHits?: number | undefined
                keepDiacriticsOnCharacters?: string | undefined
                customRanking?: string[] | undefined
                attributesToRetrieve?: string[] | undefined
                ranking?: string[] | undefined
                relevancyStrictness?: number | undefined
                attributesToHighlight?: string[] | undefined
                attributesToSnippet?: string[] | undefined
                highlightPreTag?: string | undefined
                highlightPostTag?: string | undefined
                snippetEllipsisText?: string | undefined
                restrictHighlightAndSnippetArrays?: boolean | undefined
                hitsPerPage?: number | undefined
                minWordSizefor1Typo?: number | undefined
                minWordSizefor2Typos?: number | undefined
                typoTolerance?: boolean | 'min' | 'strict' | 'true' | 'false' | undefined
                allowTyposOnNumericTokens?: boolean | undefined
                disableTypoToleranceOnAttributes?: string[] | undefined
                ignorePlurals?:
                  | (
                      | 'af'
                      | 'ar'
                      | 'az'
                      | 'bg'
                      | 'bn'
                      | 'ca'
                      | 'cs'
                      | 'cy'
                      | 'da'
                      | 'de'
                      | 'el'
                      | 'en'
                      | 'eo'
                      | 'es'
                      | 'et'
                      | 'eu'
                      | 'fa'
                      | 'fi'
                      | 'fo'
                      | 'fr'
                      | 'ga'
                      | 'gl'
                      | 'he'
                      | 'hi'
                      | 'hu'
                      | 'hy'
                      | 'id'
                      | 'is'
                      | 'it'
                      | 'ja'
                      | 'ka'
                      | 'kk'
                      | 'ko'
                      | 'ku'
                      | 'ky'
                      | 'lt'
                      | 'lv'
                      | 'mi'
                      | 'mn'
                      | 'mr'
                      | 'ms'
                      | 'mt'
                      | 'nb'
                      | 'nl'
                      | 'no'
                      | 'ns'
                      | 'pl'
                      | 'ps'
                      | 'pt'
                      | 'pt-br'
                      | 'qu'
                      | 'ro'
                      | 'ru'
                      | 'sk'
                      | 'sq'
                      | 'sv'
                      | 'sw'
                      | 'ta'
                      | 'te'
                      | 'th'
                      | 'tl'
                      | 'tn'
                      | 'tr'
                      | 'tt'
                      | 'uk'
                      | 'ur'
                      | 'uz'
                      | 'zh'
                    )[]
                  | 'true'
                  | 'false'
                  | boolean
                  | undefined
                removeStopWords?:
                  | (
                      | 'af'
                      | 'ar'
                      | 'az'
                      | 'bg'
                      | 'bn'
                      | 'ca'
                      | 'cs'
                      | 'cy'
                      | 'da'
                      | 'de'
                      | 'el'
                      | 'en'
                      | 'eo'
                      | 'es'
                      | 'et'
                      | 'eu'
                      | 'fa'
                      | 'fi'
                      | 'fo'
                      | 'fr'
                      | 'ga'
                      | 'gl'
                      | 'he'
                      | 'hi'
                      | 'hu'
                      | 'hy'
                      | 'id'
                      | 'is'
                      | 'it'
                      | 'ja'
                      | 'ka'
                      | 'kk'
                      | 'ko'
                      | 'ku'
                      | 'ky'
                      | 'lt'
                      | 'lv'
                      | 'mi'
                      | 'mn'
                      | 'mr'
                      | 'ms'
                      | 'mt'
                      | 'nb'
                      | 'nl'
                      | 'no'
                      | 'ns'
                      | 'pl'
                      | 'ps'
                      | 'pt'
                      | 'pt-br'
                      | 'qu'
                      | 'ro'
                      | 'ru'
                      | 'sk'
                      | 'sq'
                      | 'sv'
                      | 'sw'
                      | 'ta'
                      | 'te'
                      | 'th'
                      | 'tl'
                      | 'tn'
                      | 'tr'
                      | 'tt'
                      | 'uk'
                      | 'ur'
                      | 'uz'
                      | 'zh'
                    )[]
                  | boolean
                  | undefined
                queryLanguages?:
                  | (
                      | 'af'
                      | 'ar'
                      | 'az'
                      | 'bg'
                      | 'bn'
                      | 'ca'
                      | 'cs'
                      | 'cy'
                      | 'da'
                      | 'de'
                      | 'el'
                      | 'en'
                      | 'eo'
                      | 'es'
                      | 'et'
                      | 'eu'
                      | 'fa'
                      | 'fi'
                      | 'fo'
                      | 'fr'
                      | 'ga'
                      | 'gl'
                      | 'he'
                      | 'hi'
                      | 'hu'
                      | 'hy'
                      | 'id'
                      | 'is'
                      | 'it'
                      | 'ja'
                      | 'ka'
                      | 'kk'
                      | 'ko'
                      | 'ku'
                      | 'ky'
                      | 'lt'
                      | 'lv'
                      | 'mi'
                      | 'mn'
                      | 'mr'
                      | 'ms'
                      | 'mt'
                      | 'nb'
                      | 'nl'
                      | 'no'
                      | 'ns'
                      | 'pl'
                      | 'ps'
                      | 'pt'
                      | 'pt-br'
                      | 'qu'
                      | 'ro'
                      | 'ru'
                      | 'sk'
                      | 'sq'
                      | 'sv'
                      | 'sw'
                      | 'ta'
                      | 'te'
                      | 'th'
                      | 'tl'
                      | 'tn'
                      | 'tr'
                      | 'tt'
                      | 'uk'
                      | 'ur'
                      | 'uz'
                      | 'zh'
                    )[]
                  | undefined
                decompoundQuery?: boolean | undefined
                enableRules?: boolean | undefined
                enablePersonalization?: boolean | undefined
                queryType?: 'prefixLast' | 'prefixAll' | 'prefixNone' | undefined
                removeWordsIfNoResults?:
                  | 'none'
                  | 'lastWords'
                  | 'firstWords'
                  | 'allOptional'
                  | undefined
                mode?: 'neuralSearch' | 'keywordSearch' | undefined
                semanticSearch?:
                  | { eventSources?: string[] | ({ [x: string]: unknown } | null) | undefined }
                  | undefined
                advancedSyntax?: boolean | undefined
                optionalWords?: string | ({ [x: string]: unknown } | null) | string[] | undefined
                disableExactOnAttributes?: string[] | undefined
                exactOnSingleWordQuery?: 'attribute' | 'none' | 'word' | undefined
                alternativesAsExact?:
                  | (
                      | 'ignorePlurals'
                      | 'singleWordSynonym'
                      | 'multiWordsSynonym'
                      | 'ignoreConjugations'
                    )[]
                  | undefined
                advancedSyntaxFeatures?: ('exactPhrase' | 'excludeWords')[] | undefined
                distinct?: boolean | number | undefined
                replaceSynonymsInHighlight?: boolean | undefined
                minProximity?: number | undefined
                responseFields?: string[] | undefined
                maxValuesPerFacet?: number | undefined
                sortFacetValuesBy?: string | undefined
                attributeCriteriaComputedByMinProximity?: boolean | undefined
                renderingContent?:
                  | {
                      facetOrdering?:
                        | {
                            facets?: { order?: string[] | undefined } | undefined
                            values?:
                              | {
                                  [x: string]: {
                                    order?: string[] | undefined
                                    sortRemainingBy?: 'count' | 'alpha' | 'hidden' | undefined
                                    hide?: string[] | undefined
                                  }
                                }
                              | undefined
                          }
                        | undefined
                      redirect?: { url?: string | undefined } | undefined
                      widgets?:
                        | {
                            banners?:
                              | {
                                  image?:
                                    | {
                                        urls?: { url?: string | undefined }[] | undefined
                                        title?: string | undefined
                                      }
                                    | undefined
                                  link?: { url?: string | undefined } | undefined
                                }[]
                              | undefined
                          }
                        | undefined
                    }
                  | undefined
                enableReRanking?: boolean | undefined
                reRankingApplyFilter?:
                  | unknown[]
                  | string
                  | ({ [x: string]: unknown } | null)
                  | undefined
              }
            }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 404
          }
    }
  } & {
    '/1/indexes/:indexName/synonyms/:objectID': {
      $get:
        | {
            input: { param: { indexName: string; objectID: string } }
            output: {
              objectID: string
              type:
                | 'synonym'
                | 'onewaysynonym'
                | 'altcorrection1'
                | 'altcorrection2'
                | 'placeholder'
                | 'oneWaySynonym'
                | 'altCorrection1'
                | 'altCorrection2'
              synonyms?: string[] | undefined
              input?: string | undefined
              word?: string | undefined
              corrections?: string[] | undefined
              placeholder?: string | undefined
              replacements?: string[] | undefined
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { param: { indexName: string; objectID: string } }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 400
          }
        | {
            input: { param: { indexName: string; objectID: string } }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 402
          }
        | {
            input: { param: { indexName: string; objectID: string } }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 403
          }
        | {
            input: { param: { indexName: string; objectID: string } }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 404
          }
      $put:
        | {
            input: { param: { indexName: string; objectID: string } } & {
              query: { forwardToReplicas?: boolean | undefined }
            } & {
              json: {
                objectID: string
                type:
                  | 'synonym'
                  | 'onewaysynonym'
                  | 'altcorrection1'
                  | 'altcorrection2'
                  | 'placeholder'
                  | 'oneWaySynonym'
                  | 'altCorrection1'
                  | 'altCorrection2'
                synonyms?: string[] | undefined
                input?: string | undefined
                word?: string | undefined
                corrections?: string[] | undefined
                placeholder?: string | undefined
                replacements?: string[] | undefined
              }
            }
            output: { taskID: bigint; updatedAt: string; id: string }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { param: { indexName: string; objectID: string } } & {
              query: { forwardToReplicas?: boolean | undefined }
            } & {
              json: {
                objectID: string
                type:
                  | 'synonym'
                  | 'onewaysynonym'
                  | 'altcorrection1'
                  | 'altcorrection2'
                  | 'placeholder'
                  | 'oneWaySynonym'
                  | 'altCorrection1'
                  | 'altCorrection2'
                synonyms?: string[] | undefined
                input?: string | undefined
                word?: string | undefined
                corrections?: string[] | undefined
                placeholder?: string | undefined
                replacements?: string[] | undefined
              }
            }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 400
          }
        | {
            input: { param: { indexName: string; objectID: string } } & {
              query: { forwardToReplicas?: boolean | undefined }
            } & {
              json: {
                objectID: string
                type:
                  | 'synonym'
                  | 'onewaysynonym'
                  | 'altcorrection1'
                  | 'altcorrection2'
                  | 'placeholder'
                  | 'oneWaySynonym'
                  | 'altCorrection1'
                  | 'altCorrection2'
                synonyms?: string[] | undefined
                input?: string | undefined
                word?: string | undefined
                corrections?: string[] | undefined
                placeholder?: string | undefined
                replacements?: string[] | undefined
              }
            }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 402
          }
        | {
            input: { param: { indexName: string; objectID: string } } & {
              query: { forwardToReplicas?: boolean | undefined }
            } & {
              json: {
                objectID: string
                type:
                  | 'synonym'
                  | 'onewaysynonym'
                  | 'altcorrection1'
                  | 'altcorrection2'
                  | 'placeholder'
                  | 'oneWaySynonym'
                  | 'altCorrection1'
                  | 'altCorrection2'
                synonyms?: string[] | undefined
                input?: string | undefined
                word?: string | undefined
                corrections?: string[] | undefined
                placeholder?: string | undefined
                replacements?: string[] | undefined
              }
            }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 403
          }
        | {
            input: { param: { indexName: string; objectID: string } } & {
              query: { forwardToReplicas?: boolean | undefined }
            } & {
              json: {
                objectID: string
                type:
                  | 'synonym'
                  | 'onewaysynonym'
                  | 'altcorrection1'
                  | 'altcorrection2'
                  | 'placeholder'
                  | 'oneWaySynonym'
                  | 'altCorrection1'
                  | 'altCorrection2'
                synonyms?: string[] | undefined
                input?: string | undefined
                word?: string | undefined
                corrections?: string[] | undefined
                placeholder?: string | undefined
                replacements?: string[] | undefined
              }
            }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 404
          }
      $delete:
        | {
            input: { param: { indexName: string; objectID: string } } & {
              query: { forwardToReplicas?: boolean | undefined }
            }
            output: { taskID: bigint; deletedAt: string }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { param: { indexName: string; objectID: string } } & {
              query: { forwardToReplicas?: boolean | undefined }
            }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 400
          }
        | {
            input: { param: { indexName: string; objectID: string } } & {
              query: { forwardToReplicas?: boolean | undefined }
            }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 402
          }
        | {
            input: { param: { indexName: string; objectID: string } } & {
              query: { forwardToReplicas?: boolean | undefined }
            }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 403
          }
        | {
            input: { param: { indexName: string; objectID: string } } & {
              query: { forwardToReplicas?: boolean | undefined }
            }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 404
          }
    }
  } & {
    '/1/indexes/:indexName/synonyms/batch': {
      $post:
        | {
            input: { param: { indexName: string } } & {
              query: {
                forwardToReplicas?: boolean | undefined
                replaceExistingSynonyms?: boolean | undefined
              }
            } & {
              json: {
                objectID: string
                type:
                  | 'synonym'
                  | 'onewaysynonym'
                  | 'altcorrection1'
                  | 'altcorrection2'
                  | 'placeholder'
                  | 'oneWaySynonym'
                  | 'altCorrection1'
                  | 'altCorrection2'
                synonyms?: string[] | undefined
                input?: string | undefined
                word?: string | undefined
                corrections?: string[] | undefined
                placeholder?: string | undefined
                replacements?: string[] | undefined
              }[]
            }
            output: { taskID: bigint; updatedAt: string }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { param: { indexName: string } } & {
              query: {
                forwardToReplicas?: boolean | undefined
                replaceExistingSynonyms?: boolean | undefined
              }
            } & {
              json: {
                objectID: string
                type:
                  | 'synonym'
                  | 'onewaysynonym'
                  | 'altcorrection1'
                  | 'altcorrection2'
                  | 'placeholder'
                  | 'oneWaySynonym'
                  | 'altCorrection1'
                  | 'altCorrection2'
                synonyms?: string[] | undefined
                input?: string | undefined
                word?: string | undefined
                corrections?: string[] | undefined
                placeholder?: string | undefined
                replacements?: string[] | undefined
              }[]
            }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 400
          }
        | {
            input: { param: { indexName: string } } & {
              query: {
                forwardToReplicas?: boolean | undefined
                replaceExistingSynonyms?: boolean | undefined
              }
            } & {
              json: {
                objectID: string
                type:
                  | 'synonym'
                  | 'onewaysynonym'
                  | 'altcorrection1'
                  | 'altcorrection2'
                  | 'placeholder'
                  | 'oneWaySynonym'
                  | 'altCorrection1'
                  | 'altCorrection2'
                synonyms?: string[] | undefined
                input?: string | undefined
                word?: string | undefined
                corrections?: string[] | undefined
                placeholder?: string | undefined
                replacements?: string[] | undefined
              }[]
            }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 402
          }
        | {
            input: { param: { indexName: string } } & {
              query: {
                forwardToReplicas?: boolean | undefined
                replaceExistingSynonyms?: boolean | undefined
              }
            } & {
              json: {
                objectID: string
                type:
                  | 'synonym'
                  | 'onewaysynonym'
                  | 'altcorrection1'
                  | 'altcorrection2'
                  | 'placeholder'
                  | 'oneWaySynonym'
                  | 'altCorrection1'
                  | 'altCorrection2'
                synonyms?: string[] | undefined
                input?: string | undefined
                word?: string | undefined
                corrections?: string[] | undefined
                placeholder?: string | undefined
                replacements?: string[] | undefined
              }[]
            }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 403
          }
        | {
            input: { param: { indexName: string } } & {
              query: {
                forwardToReplicas?: boolean | undefined
                replaceExistingSynonyms?: boolean | undefined
              }
            } & {
              json: {
                objectID: string
                type:
                  | 'synonym'
                  | 'onewaysynonym'
                  | 'altcorrection1'
                  | 'altcorrection2'
                  | 'placeholder'
                  | 'oneWaySynonym'
                  | 'altCorrection1'
                  | 'altCorrection2'
                synonyms?: string[] | undefined
                input?: string | undefined
                word?: string | undefined
                corrections?: string[] | undefined
                placeholder?: string | undefined
                replacements?: string[] | undefined
              }[]
            }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 404
          }
    }
  } & {
    '/1/indexes/:indexName/synonyms/clear': {
      $post:
        | {
            input: { param: { indexName: string } } & {
              query: { forwardToReplicas?: boolean | undefined }
            }
            output: { taskID: bigint; updatedAt: string }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { param: { indexName: string } } & {
              query: { forwardToReplicas?: boolean | undefined }
            }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 400
          }
        | {
            input: { param: { indexName: string } } & {
              query: { forwardToReplicas?: boolean | undefined }
            }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 402
          }
        | {
            input: { param: { indexName: string } } & {
              query: { forwardToReplicas?: boolean | undefined }
            }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 403
          }
        | {
            input: { param: { indexName: string } } & {
              query: { forwardToReplicas?: boolean | undefined }
            }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 404
          }
    }
  } & {
    '/1/indexes/:indexName/synonyms/search': {
      $post:
        | {
            input: { param: { indexName: string } } & {
              json: {
                query?: string | undefined
                type?:
                  | 'synonym'
                  | 'onewaysynonym'
                  | 'altcorrection1'
                  | 'altcorrection2'
                  | 'placeholder'
                  | 'oneWaySynonym'
                  | 'altCorrection1'
                  | 'altCorrection2'
                  | undefined
                page?: number | undefined
                hitsPerPage?: number | undefined
              }
            }
            output: {
              hits: {
                objectID: string
                type:
                  | 'synonym'
                  | 'onewaysynonym'
                  | 'altcorrection1'
                  | 'altcorrection2'
                  | 'placeholder'
                  | 'oneWaySynonym'
                  | 'altCorrection1'
                  | 'altCorrection2'
                synonyms?: string[] | undefined
                input?: string | undefined
                word?: string | undefined
                corrections?: string[] | undefined
                placeholder?: string | undefined
                replacements?: string[] | undefined
              }[]
              nbHits: number
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { param: { indexName: string } } & {
              json: {
                query?: string | undefined
                type?:
                  | 'synonym'
                  | 'onewaysynonym'
                  | 'altcorrection1'
                  | 'altcorrection2'
                  | 'placeholder'
                  | 'oneWaySynonym'
                  | 'altCorrection1'
                  | 'altCorrection2'
                  | undefined
                page?: number | undefined
                hitsPerPage?: number | undefined
              }
            }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 400
          }
        | {
            input: { param: { indexName: string } } & {
              json: {
                query?: string | undefined
                type?:
                  | 'synonym'
                  | 'onewaysynonym'
                  | 'altcorrection1'
                  | 'altcorrection2'
                  | 'placeholder'
                  | 'oneWaySynonym'
                  | 'altCorrection1'
                  | 'altCorrection2'
                  | undefined
                page?: number | undefined
                hitsPerPage?: number | undefined
              }
            }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 402
          }
        | {
            input: { param: { indexName: string } } & {
              json: {
                query?: string | undefined
                type?:
                  | 'synonym'
                  | 'onewaysynonym'
                  | 'altcorrection1'
                  | 'altcorrection2'
                  | 'placeholder'
                  | 'oneWaySynonym'
                  | 'altCorrection1'
                  | 'altCorrection2'
                  | undefined
                page?: number | undefined
                hitsPerPage?: number | undefined
              }
            }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 403
          }
        | {
            input: { param: { indexName: string } } & {
              json: {
                query?: string | undefined
                type?:
                  | 'synonym'
                  | 'onewaysynonym'
                  | 'altcorrection1'
                  | 'altcorrection2'
                  | 'placeholder'
                  | 'oneWaySynonym'
                  | 'altCorrection1'
                  | 'altCorrection2'
                  | undefined
                page?: number | undefined
                hitsPerPage?: number | undefined
              }
            }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 404
          }
    }
  } & {
    '/1/keys': {
      $get:
        | {
            input: {}
            output: {
              keys: {
                value: string
                createdAt: bigint
                acl: (
                  | 'addObject'
                  | 'analytics'
                  | 'browse'
                  | 'deleteObject'
                  | 'deleteIndex'
                  | 'editSettings'
                  | 'inference'
                  | 'listIndexes'
                  | 'logs'
                  | 'personalization'
                  | 'recommendation'
                  | 'search'
                  | 'seeUnretrievableAttributes'
                  | 'settings'
                  | 'usage'
                  | 'nluWriteProject'
                  | 'nluReadProject'
                  | 'nluWriteEntity'
                  | 'nluReadEntity'
                  | 'nluWriteIntent'
                  | 'nluReadIntent'
                  | 'nluPrediction'
                  | 'nluReadAnswers'
                )[]
                description?: string | undefined
                indexes?: string[] | undefined
                maxHitsPerQuery?: number | undefined
                maxQueriesPerIPPerHour?: number | undefined
                queryParameters?: string | undefined
                referers?: string[] | undefined
                validity?: number | undefined
              }[]
            }
            outputFormat: 'json'
            status: 200
          }
        | { input: {}; output: { message?: string | undefined }; outputFormat: 'json'; status: 400 }
        | { input: {}; output: { message?: string | undefined }; outputFormat: 'json'; status: 402 }
        | { input: {}; output: { message?: string | undefined }; outputFormat: 'json'; status: 403 }
        | { input: {}; output: { message?: string | undefined }; outputFormat: 'json'; status: 404 }
      $post:
        | {
            input: {
              json: {
                acl: (
                  | 'addObject'
                  | 'analytics'
                  | 'browse'
                  | 'deleteObject'
                  | 'deleteIndex'
                  | 'editSettings'
                  | 'inference'
                  | 'listIndexes'
                  | 'logs'
                  | 'personalization'
                  | 'recommendation'
                  | 'search'
                  | 'seeUnretrievableAttributes'
                  | 'settings'
                  | 'usage'
                  | 'nluWriteProject'
                  | 'nluReadProject'
                  | 'nluWriteEntity'
                  | 'nluReadEntity'
                  | 'nluWriteIntent'
                  | 'nluReadIntent'
                  | 'nluPrediction'
                  | 'nluReadAnswers'
                )[]
                description?: string | undefined
                indexes?: string[] | undefined
                maxHitsPerQuery?: number | undefined
                maxQueriesPerIPPerHour?: number | undefined
                queryParameters?: string | undefined
                referers?: string[] | undefined
                validity?: number | undefined
              }
            }
            output: { key: string; createdAt: string }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: {
              json: {
                acl: (
                  | 'addObject'
                  | 'analytics'
                  | 'browse'
                  | 'deleteObject'
                  | 'deleteIndex'
                  | 'editSettings'
                  | 'inference'
                  | 'listIndexes'
                  | 'logs'
                  | 'personalization'
                  | 'recommendation'
                  | 'search'
                  | 'seeUnretrievableAttributes'
                  | 'settings'
                  | 'usage'
                  | 'nluWriteProject'
                  | 'nluReadProject'
                  | 'nluWriteEntity'
                  | 'nluReadEntity'
                  | 'nluWriteIntent'
                  | 'nluReadIntent'
                  | 'nluPrediction'
                  | 'nluReadAnswers'
                )[]
                description?: string | undefined
                indexes?: string[] | undefined
                maxHitsPerQuery?: number | undefined
                maxQueriesPerIPPerHour?: number | undefined
                queryParameters?: string | undefined
                referers?: string[] | undefined
                validity?: number | undefined
              }
            }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 400
          }
        | {
            input: {
              json: {
                acl: (
                  | 'addObject'
                  | 'analytics'
                  | 'browse'
                  | 'deleteObject'
                  | 'deleteIndex'
                  | 'editSettings'
                  | 'inference'
                  | 'listIndexes'
                  | 'logs'
                  | 'personalization'
                  | 'recommendation'
                  | 'search'
                  | 'seeUnretrievableAttributes'
                  | 'settings'
                  | 'usage'
                  | 'nluWriteProject'
                  | 'nluReadProject'
                  | 'nluWriteEntity'
                  | 'nluReadEntity'
                  | 'nluWriteIntent'
                  | 'nluReadIntent'
                  | 'nluPrediction'
                  | 'nluReadAnswers'
                )[]
                description?: string | undefined
                indexes?: string[] | undefined
                maxHitsPerQuery?: number | undefined
                maxQueriesPerIPPerHour?: number | undefined
                queryParameters?: string | undefined
                referers?: string[] | undefined
                validity?: number | undefined
              }
            }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 402
          }
        | {
            input: {
              json: {
                acl: (
                  | 'addObject'
                  | 'analytics'
                  | 'browse'
                  | 'deleteObject'
                  | 'deleteIndex'
                  | 'editSettings'
                  | 'inference'
                  | 'listIndexes'
                  | 'logs'
                  | 'personalization'
                  | 'recommendation'
                  | 'search'
                  | 'seeUnretrievableAttributes'
                  | 'settings'
                  | 'usage'
                  | 'nluWriteProject'
                  | 'nluReadProject'
                  | 'nluWriteEntity'
                  | 'nluReadEntity'
                  | 'nluWriteIntent'
                  | 'nluReadIntent'
                  | 'nluPrediction'
                  | 'nluReadAnswers'
                )[]
                description?: string | undefined
                indexes?: string[] | undefined
                maxHitsPerQuery?: number | undefined
                maxQueriesPerIPPerHour?: number | undefined
                queryParameters?: string | undefined
                referers?: string[] | undefined
                validity?: number | undefined
              }
            }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 403
          }
        | {
            input: {
              json: {
                acl: (
                  | 'addObject'
                  | 'analytics'
                  | 'browse'
                  | 'deleteObject'
                  | 'deleteIndex'
                  | 'editSettings'
                  | 'inference'
                  | 'listIndexes'
                  | 'logs'
                  | 'personalization'
                  | 'recommendation'
                  | 'search'
                  | 'seeUnretrievableAttributes'
                  | 'settings'
                  | 'usage'
                  | 'nluWriteProject'
                  | 'nluReadProject'
                  | 'nluWriteEntity'
                  | 'nluReadEntity'
                  | 'nluWriteIntent'
                  | 'nluReadIntent'
                  | 'nluPrediction'
                  | 'nluReadAnswers'
                )[]
                description?: string | undefined
                indexes?: string[] | undefined
                maxHitsPerQuery?: number | undefined
                maxQueriesPerIPPerHour?: number | undefined
                queryParameters?: string | undefined
                referers?: string[] | undefined
                validity?: number | undefined
              }
            }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 404
          }
    }
  } & {
    '/1/keys/:key': {
      $get:
        | {
            input: { param: { key: string } }
            output: {
              value: string
              createdAt: bigint
              acl: (
                | 'addObject'
                | 'analytics'
                | 'browse'
                | 'deleteObject'
                | 'deleteIndex'
                | 'editSettings'
                | 'inference'
                | 'listIndexes'
                | 'logs'
                | 'personalization'
                | 'recommendation'
                | 'search'
                | 'seeUnretrievableAttributes'
                | 'settings'
                | 'usage'
                | 'nluWriteProject'
                | 'nluReadProject'
                | 'nluWriteEntity'
                | 'nluReadEntity'
                | 'nluWriteIntent'
                | 'nluReadIntent'
                | 'nluPrediction'
                | 'nluReadAnswers'
              )[]
              description?: string | undefined
              indexes?: string[] | undefined
              maxHitsPerQuery?: number | undefined
              maxQueriesPerIPPerHour?: number | undefined
              queryParameters?: string | undefined
              referers?: string[] | undefined
              validity?: number | undefined
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { param: { key: string } }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 400
          }
        | {
            input: { param: { key: string } }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 402
          }
        | {
            input: { param: { key: string } }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 403
          }
        | {
            input: { param: { key: string } }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 404
          }
      $put:
        | {
            input: { param: { key: string } } & {
              json: {
                acl: (
                  | 'addObject'
                  | 'analytics'
                  | 'browse'
                  | 'deleteObject'
                  | 'deleteIndex'
                  | 'editSettings'
                  | 'inference'
                  | 'listIndexes'
                  | 'logs'
                  | 'personalization'
                  | 'recommendation'
                  | 'search'
                  | 'seeUnretrievableAttributes'
                  | 'settings'
                  | 'usage'
                  | 'nluWriteProject'
                  | 'nluReadProject'
                  | 'nluWriteEntity'
                  | 'nluReadEntity'
                  | 'nluWriteIntent'
                  | 'nluReadIntent'
                  | 'nluPrediction'
                  | 'nluReadAnswers'
                )[]
                description?: string | undefined
                indexes?: string[] | undefined
                maxHitsPerQuery?: number | undefined
                maxQueriesPerIPPerHour?: number | undefined
                queryParameters?: string | undefined
                referers?: string[] | undefined
                validity?: number | undefined
              }
            }
            output: { key: string; updatedAt: string }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { param: { key: string } } & {
              json: {
                acl: (
                  | 'addObject'
                  | 'analytics'
                  | 'browse'
                  | 'deleteObject'
                  | 'deleteIndex'
                  | 'editSettings'
                  | 'inference'
                  | 'listIndexes'
                  | 'logs'
                  | 'personalization'
                  | 'recommendation'
                  | 'search'
                  | 'seeUnretrievableAttributes'
                  | 'settings'
                  | 'usage'
                  | 'nluWriteProject'
                  | 'nluReadProject'
                  | 'nluWriteEntity'
                  | 'nluReadEntity'
                  | 'nluWriteIntent'
                  | 'nluReadIntent'
                  | 'nluPrediction'
                  | 'nluReadAnswers'
                )[]
                description?: string | undefined
                indexes?: string[] | undefined
                maxHitsPerQuery?: number | undefined
                maxQueriesPerIPPerHour?: number | undefined
                queryParameters?: string | undefined
                referers?: string[] | undefined
                validity?: number | undefined
              }
            }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 400
          }
        | {
            input: { param: { key: string } } & {
              json: {
                acl: (
                  | 'addObject'
                  | 'analytics'
                  | 'browse'
                  | 'deleteObject'
                  | 'deleteIndex'
                  | 'editSettings'
                  | 'inference'
                  | 'listIndexes'
                  | 'logs'
                  | 'personalization'
                  | 'recommendation'
                  | 'search'
                  | 'seeUnretrievableAttributes'
                  | 'settings'
                  | 'usage'
                  | 'nluWriteProject'
                  | 'nluReadProject'
                  | 'nluWriteEntity'
                  | 'nluReadEntity'
                  | 'nluWriteIntent'
                  | 'nluReadIntent'
                  | 'nluPrediction'
                  | 'nluReadAnswers'
                )[]
                description?: string | undefined
                indexes?: string[] | undefined
                maxHitsPerQuery?: number | undefined
                maxQueriesPerIPPerHour?: number | undefined
                queryParameters?: string | undefined
                referers?: string[] | undefined
                validity?: number | undefined
              }
            }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 402
          }
        | {
            input: { param: { key: string } } & {
              json: {
                acl: (
                  | 'addObject'
                  | 'analytics'
                  | 'browse'
                  | 'deleteObject'
                  | 'deleteIndex'
                  | 'editSettings'
                  | 'inference'
                  | 'listIndexes'
                  | 'logs'
                  | 'personalization'
                  | 'recommendation'
                  | 'search'
                  | 'seeUnretrievableAttributes'
                  | 'settings'
                  | 'usage'
                  | 'nluWriteProject'
                  | 'nluReadProject'
                  | 'nluWriteEntity'
                  | 'nluReadEntity'
                  | 'nluWriteIntent'
                  | 'nluReadIntent'
                  | 'nluPrediction'
                  | 'nluReadAnswers'
                )[]
                description?: string | undefined
                indexes?: string[] | undefined
                maxHitsPerQuery?: number | undefined
                maxQueriesPerIPPerHour?: number | undefined
                queryParameters?: string | undefined
                referers?: string[] | undefined
                validity?: number | undefined
              }
            }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 403
          }
        | {
            input: { param: { key: string } } & {
              json: {
                acl: (
                  | 'addObject'
                  | 'analytics'
                  | 'browse'
                  | 'deleteObject'
                  | 'deleteIndex'
                  | 'editSettings'
                  | 'inference'
                  | 'listIndexes'
                  | 'logs'
                  | 'personalization'
                  | 'recommendation'
                  | 'search'
                  | 'seeUnretrievableAttributes'
                  | 'settings'
                  | 'usage'
                  | 'nluWriteProject'
                  | 'nluReadProject'
                  | 'nluWriteEntity'
                  | 'nluReadEntity'
                  | 'nluWriteIntent'
                  | 'nluReadIntent'
                  | 'nluPrediction'
                  | 'nluReadAnswers'
                )[]
                description?: string | undefined
                indexes?: string[] | undefined
                maxHitsPerQuery?: number | undefined
                maxQueriesPerIPPerHour?: number | undefined
                queryParameters?: string | undefined
                referers?: string[] | undefined
                validity?: number | undefined
              }
            }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 404
          }
      $delete:
        | {
            input: { param: { key: string } }
            output: { deletedAt: string }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { param: { key: string } }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 400
          }
        | {
            input: { param: { key: string } }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 402
          }
        | {
            input: { param: { key: string } }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 403
          }
        | {
            input: { param: { key: string } }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 404
          }
    }
  } & {
    '/1/keys/:key/restore': {
      $post:
        | {
            input: { param: { key: string } }
            output: { key: string; createdAt: string }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { param: { key: string } }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 400
          }
        | {
            input: { param: { key: string } }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 402
          }
        | {
            input: { param: { key: string } }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 403
          }
        | {
            input: { param: { key: string } }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 404
          }
    }
  } & {
    '/1/indexes/:indexName/rules/:objectID': {
      $get:
        | {
            input: { param: { indexName: string; objectID: string } }
            output: {
              objectID: string
              conditions?:
                | {
                    pattern?: string | undefined
                    anchoring?: 'is' | 'startsWith' | 'endsWith' | 'contains' | undefined
                    alternatives?: boolean | undefined
                    context?: string | undefined
                    filters?: string | undefined
                  }[]
                | undefined
              consequence: {
                params?:
                  | {
                      similarQuery?: string | undefined
                      filters?: string | undefined
                      facetFilters?: unknown[] | string | undefined
                      optionalFilters?: unknown[] | string | undefined
                      numericFilters?: unknown[] | string | undefined
                      tagFilters?: unknown[] | string | undefined
                      sumOrFiltersScores?: boolean | undefined
                      restrictSearchableAttributes?: string[] | undefined
                      facets?: string[] | undefined
                      facetingAfterDistinct?: boolean | undefined
                      page?: number | undefined
                      offset?: number | undefined
                      length?: number | undefined
                      aroundLatLng?: string | undefined
                      aroundLatLngViaIP?: boolean | undefined
                      aroundRadius?: number | 'all' | undefined
                      aroundPrecision?:
                        | number
                        | { from?: number | undefined; value?: number | undefined }[]
                        | undefined
                      minimumAroundRadius?: number | undefined
                      insideBoundingBox?:
                        | string
                        | ({ [x: string]: unknown } | null)
                        | number[][]
                        | undefined
                      insidePolygon?: number[][] | undefined
                      naturalLanguages?:
                        | (
                            | 'af'
                            | 'ar'
                            | 'az'
                            | 'bg'
                            | 'bn'
                            | 'ca'
                            | 'cs'
                            | 'cy'
                            | 'da'
                            | 'de'
                            | 'el'
                            | 'en'
                            | 'eo'
                            | 'es'
                            | 'et'
                            | 'eu'
                            | 'fa'
                            | 'fi'
                            | 'fo'
                            | 'fr'
                            | 'ga'
                            | 'gl'
                            | 'he'
                            | 'hi'
                            | 'hu'
                            | 'hy'
                            | 'id'
                            | 'is'
                            | 'it'
                            | 'ja'
                            | 'ka'
                            | 'kk'
                            | 'ko'
                            | 'ku'
                            | 'ky'
                            | 'lt'
                            | 'lv'
                            | 'mi'
                            | 'mn'
                            | 'mr'
                            | 'ms'
                            | 'mt'
                            | 'nb'
                            | 'nl'
                            | 'no'
                            | 'ns'
                            | 'pl'
                            | 'ps'
                            | 'pt'
                            | 'pt-br'
                            | 'qu'
                            | 'ro'
                            | 'ru'
                            | 'sk'
                            | 'sq'
                            | 'sv'
                            | 'sw'
                            | 'ta'
                            | 'te'
                            | 'th'
                            | 'tl'
                            | 'tn'
                            | 'tr'
                            | 'tt'
                            | 'uk'
                            | 'ur'
                            | 'uz'
                            | 'zh'
                          )[]
                        | undefined
                      ruleContexts?: string[] | undefined
                      personalizationImpact?: number | undefined
                      userToken?: string | undefined
                      getRankingInfo?: boolean | undefined
                      synonyms?: boolean | undefined
                      clickAnalytics?: boolean | undefined
                      analytics?: boolean | undefined
                      analyticsTags?: string[] | undefined
                      percentileComputation?: boolean | undefined
                      enableABTest?: boolean | undefined
                      attributesToRetrieve?: string[] | undefined
                      ranking?: string[] | undefined
                      relevancyStrictness?: number | undefined
                      attributesToHighlight?: string[] | undefined
                      attributesToSnippet?: string[] | undefined
                      highlightPreTag?: string | undefined
                      highlightPostTag?: string | undefined
                      snippetEllipsisText?: string | undefined
                      restrictHighlightAndSnippetArrays?: boolean | undefined
                      hitsPerPage?: number | undefined
                      minWordSizefor1Typo?: number | undefined
                      minWordSizefor2Typos?: number | undefined
                      typoTolerance?: boolean | 'min' | 'strict' | 'true' | 'false' | undefined
                      allowTyposOnNumericTokens?: boolean | undefined
                      disableTypoToleranceOnAttributes?: string[] | undefined
                      ignorePlurals?:
                        | (
                            | 'af'
                            | 'ar'
                            | 'az'
                            | 'bg'
                            | 'bn'
                            | 'ca'
                            | 'cs'
                            | 'cy'
                            | 'da'
                            | 'de'
                            | 'el'
                            | 'en'
                            | 'eo'
                            | 'es'
                            | 'et'
                            | 'eu'
                            | 'fa'
                            | 'fi'
                            | 'fo'
                            | 'fr'
                            | 'ga'
                            | 'gl'
                            | 'he'
                            | 'hi'
                            | 'hu'
                            | 'hy'
                            | 'id'
                            | 'is'
                            | 'it'
                            | 'ja'
                            | 'ka'
                            | 'kk'
                            | 'ko'
                            | 'ku'
                            | 'ky'
                            | 'lt'
                            | 'lv'
                            | 'mi'
                            | 'mn'
                            | 'mr'
                            | 'ms'
                            | 'mt'
                            | 'nb'
                            | 'nl'
                            | 'no'
                            | 'ns'
                            | 'pl'
                            | 'ps'
                            | 'pt'
                            | 'pt-br'
                            | 'qu'
                            | 'ro'
                            | 'ru'
                            | 'sk'
                            | 'sq'
                            | 'sv'
                            | 'sw'
                            | 'ta'
                            | 'te'
                            | 'th'
                            | 'tl'
                            | 'tn'
                            | 'tr'
                            | 'tt'
                            | 'uk'
                            | 'ur'
                            | 'uz'
                            | 'zh'
                          )[]
                        | 'true'
                        | 'false'
                        | boolean
                        | undefined
                      removeStopWords?:
                        | (
                            | 'af'
                            | 'ar'
                            | 'az'
                            | 'bg'
                            | 'bn'
                            | 'ca'
                            | 'cs'
                            | 'cy'
                            | 'da'
                            | 'de'
                            | 'el'
                            | 'en'
                            | 'eo'
                            | 'es'
                            | 'et'
                            | 'eu'
                            | 'fa'
                            | 'fi'
                            | 'fo'
                            | 'fr'
                            | 'ga'
                            | 'gl'
                            | 'he'
                            | 'hi'
                            | 'hu'
                            | 'hy'
                            | 'id'
                            | 'is'
                            | 'it'
                            | 'ja'
                            | 'ka'
                            | 'kk'
                            | 'ko'
                            | 'ku'
                            | 'ky'
                            | 'lt'
                            | 'lv'
                            | 'mi'
                            | 'mn'
                            | 'mr'
                            | 'ms'
                            | 'mt'
                            | 'nb'
                            | 'nl'
                            | 'no'
                            | 'ns'
                            | 'pl'
                            | 'ps'
                            | 'pt'
                            | 'pt-br'
                            | 'qu'
                            | 'ro'
                            | 'ru'
                            | 'sk'
                            | 'sq'
                            | 'sv'
                            | 'sw'
                            | 'ta'
                            | 'te'
                            | 'th'
                            | 'tl'
                            | 'tn'
                            | 'tr'
                            | 'tt'
                            | 'uk'
                            | 'ur'
                            | 'uz'
                            | 'zh'
                          )[]
                        | boolean
                        | undefined
                      queryLanguages?:
                        | (
                            | 'af'
                            | 'ar'
                            | 'az'
                            | 'bg'
                            | 'bn'
                            | 'ca'
                            | 'cs'
                            | 'cy'
                            | 'da'
                            | 'de'
                            | 'el'
                            | 'en'
                            | 'eo'
                            | 'es'
                            | 'et'
                            | 'eu'
                            | 'fa'
                            | 'fi'
                            | 'fo'
                            | 'fr'
                            | 'ga'
                            | 'gl'
                            | 'he'
                            | 'hi'
                            | 'hu'
                            | 'hy'
                            | 'id'
                            | 'is'
                            | 'it'
                            | 'ja'
                            | 'ka'
                            | 'kk'
                            | 'ko'
                            | 'ku'
                            | 'ky'
                            | 'lt'
                            | 'lv'
                            | 'mi'
                            | 'mn'
                            | 'mr'
                            | 'ms'
                            | 'mt'
                            | 'nb'
                            | 'nl'
                            | 'no'
                            | 'ns'
                            | 'pl'
                            | 'ps'
                            | 'pt'
                            | 'pt-br'
                            | 'qu'
                            | 'ro'
                            | 'ru'
                            | 'sk'
                            | 'sq'
                            | 'sv'
                            | 'sw'
                            | 'ta'
                            | 'te'
                            | 'th'
                            | 'tl'
                            | 'tn'
                            | 'tr'
                            | 'tt'
                            | 'uk'
                            | 'ur'
                            | 'uz'
                            | 'zh'
                          )[]
                        | undefined
                      decompoundQuery?: boolean | undefined
                      enableRules?: boolean | undefined
                      enablePersonalization?: boolean | undefined
                      queryType?: 'prefixLast' | 'prefixAll' | 'prefixNone' | undefined
                      removeWordsIfNoResults?:
                        | 'none'
                        | 'lastWords'
                        | 'firstWords'
                        | 'allOptional'
                        | undefined
                      mode?: 'neuralSearch' | 'keywordSearch' | undefined
                      semanticSearch?:
                        | {
                            eventSources?: string[] | ({ [x: string]: unknown } | null) | undefined
                          }
                        | undefined
                      advancedSyntax?: boolean | undefined
                      optionalWords?:
                        | string
                        | ({ [x: string]: unknown } | null)
                        | string[]
                        | undefined
                      disableExactOnAttributes?: string[] | undefined
                      exactOnSingleWordQuery?: 'attribute' | 'none' | 'word' | undefined
                      alternativesAsExact?:
                        | (
                            | 'ignorePlurals'
                            | 'singleWordSynonym'
                            | 'multiWordsSynonym'
                            | 'ignoreConjugations'
                          )[]
                        | undefined
                      advancedSyntaxFeatures?: ('exactPhrase' | 'excludeWords')[] | undefined
                      distinct?: boolean | number | undefined
                      replaceSynonymsInHighlight?: boolean | undefined
                      minProximity?: number | undefined
                      responseFields?: string[] | undefined
                      maxValuesPerFacet?: number | undefined
                      sortFacetValuesBy?: string | undefined
                      attributeCriteriaComputedByMinProximity?: boolean | undefined
                      renderingContent?:
                        | {
                            facetOrdering?:
                              | {
                                  facets?: { order?: string[] | undefined } | undefined
                                  values?:
                                    | {
                                        [x: string]: {
                                          order?: string[] | undefined
                                          sortRemainingBy?: 'count' | 'alpha' | 'hidden' | undefined
                                          hide?: string[] | undefined
                                        }
                                      }
                                    | undefined
                                }
                              | undefined
                            redirect?: { url?: string | undefined } | undefined
                            widgets?:
                              | {
                                  banners?:
                                    | {
                                        image?:
                                          | {
                                              urls?: { url?: string | undefined }[] | undefined
                                              title?: string | undefined
                                            }
                                          | undefined
                                        link?: { url?: string | undefined } | undefined
                                      }[]
                                    | undefined
                                }
                              | undefined
                          }
                        | undefined
                      enableReRanking?: boolean | undefined
                      reRankingApplyFilter?:
                        | unknown[]
                        | string
                        | ({ [x: string]: unknown } | null)
                        | undefined
                      query?:
                        | {
                            remove?: string[] | undefined
                            edits?:
                              | {
                                  type?: 'remove' | 'replace' | undefined
                                  delete?: string | undefined
                                  insert?: string | undefined
                                }[]
                              | undefined
                          }
                        | string
                        | undefined
                      automaticFacetFilters?:
                        | {
                            facet: string
                            score?: number | undefined
                            disjunctive?: boolean | undefined
                          }[]
                        | string[]
                        | undefined
                      automaticOptionalFacetFilters?:
                        | {
                            facet: string
                            score?: number | undefined
                            disjunctive?: boolean | undefined
                          }[]
                        | string[]
                        | undefined
                    }
                  | undefined
                promote?:
                  | (
                      | { objectIDs: string[]; position: number }
                      | { objectID: string; position: number }
                    )[]
                  | undefined
                filterPromotes?: boolean | undefined
                hide?: { objectID: string }[] | undefined
                userData?: { [x: string]: unknown } | undefined
              }
              description?: string | undefined
              enabled?: boolean | undefined
              validity?: { from?: bigint | undefined; until?: bigint | undefined }[] | undefined
              tags?: string[] | undefined
              scope?: string | undefined
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { param: { indexName: string; objectID: string } }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 400
          }
        | {
            input: { param: { indexName: string; objectID: string } }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 402
          }
        | {
            input: { param: { indexName: string; objectID: string } }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 403
          }
        | {
            input: { param: { indexName: string; objectID: string } }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 404
          }
      $put:
        | {
            input: { param: { indexName: string; objectID: string } } & {
              query: { forwardToReplicas?: boolean | undefined }
            } & {
              json: {
                objectID: string
                conditions?:
                  | {
                      pattern?: string | undefined
                      anchoring?: 'is' | 'startsWith' | 'endsWith' | 'contains' | undefined
                      alternatives?: boolean | undefined
                      context?: string | undefined
                      filters?: string | undefined
                    }[]
                  | undefined
                consequence: {
                  params?:
                    | {
                        similarQuery?: string | undefined
                        filters?: string | undefined
                        facetFilters?: unknown[] | string | undefined
                        optionalFilters?: unknown[] | string | undefined
                        numericFilters?: unknown[] | string | undefined
                        tagFilters?: unknown[] | string | undefined
                        sumOrFiltersScores?: boolean | undefined
                        restrictSearchableAttributes?: string[] | undefined
                        facets?: string[] | undefined
                        facetingAfterDistinct?: boolean | undefined
                        page?: number | undefined
                        offset?: number | undefined
                        length?: number | undefined
                        aroundLatLng?: string | undefined
                        aroundLatLngViaIP?: boolean | undefined
                        aroundRadius?: number | 'all' | undefined
                        aroundPrecision?:
                          | number
                          | { from?: number | undefined; value?: number | undefined }[]
                          | undefined
                        minimumAroundRadius?: number | undefined
                        insideBoundingBox?:
                          | string
                          | ({ [x: string]: unknown } | null)
                          | number[][]
                          | undefined
                        insidePolygon?: number[][] | undefined
                        naturalLanguages?:
                          | (
                              | 'af'
                              | 'ar'
                              | 'az'
                              | 'bg'
                              | 'bn'
                              | 'ca'
                              | 'cs'
                              | 'cy'
                              | 'da'
                              | 'de'
                              | 'el'
                              | 'en'
                              | 'eo'
                              | 'es'
                              | 'et'
                              | 'eu'
                              | 'fa'
                              | 'fi'
                              | 'fo'
                              | 'fr'
                              | 'ga'
                              | 'gl'
                              | 'he'
                              | 'hi'
                              | 'hu'
                              | 'hy'
                              | 'id'
                              | 'is'
                              | 'it'
                              | 'ja'
                              | 'ka'
                              | 'kk'
                              | 'ko'
                              | 'ku'
                              | 'ky'
                              | 'lt'
                              | 'lv'
                              | 'mi'
                              | 'mn'
                              | 'mr'
                              | 'ms'
                              | 'mt'
                              | 'nb'
                              | 'nl'
                              | 'no'
                              | 'ns'
                              | 'pl'
                              | 'ps'
                              | 'pt'
                              | 'pt-br'
                              | 'qu'
                              | 'ro'
                              | 'ru'
                              | 'sk'
                              | 'sq'
                              | 'sv'
                              | 'sw'
                              | 'ta'
                              | 'te'
                              | 'th'
                              | 'tl'
                              | 'tn'
                              | 'tr'
                              | 'tt'
                              | 'uk'
                              | 'ur'
                              | 'uz'
                              | 'zh'
                            )[]
                          | undefined
                        ruleContexts?: string[] | undefined
                        personalizationImpact?: number | undefined
                        userToken?: string | undefined
                        getRankingInfo?: boolean | undefined
                        synonyms?: boolean | undefined
                        clickAnalytics?: boolean | undefined
                        analytics?: boolean | undefined
                        analyticsTags?: string[] | undefined
                        percentileComputation?: boolean | undefined
                        enableABTest?: boolean | undefined
                        attributesToRetrieve?: string[] | undefined
                        ranking?: string[] | undefined
                        relevancyStrictness?: number | undefined
                        attributesToHighlight?: string[] | undefined
                        attributesToSnippet?: string[] | undefined
                        highlightPreTag?: string | undefined
                        highlightPostTag?: string | undefined
                        snippetEllipsisText?: string | undefined
                        restrictHighlightAndSnippetArrays?: boolean | undefined
                        hitsPerPage?: number | undefined
                        minWordSizefor1Typo?: number | undefined
                        minWordSizefor2Typos?: number | undefined
                        typoTolerance?: boolean | 'min' | 'strict' | 'true' | 'false' | undefined
                        allowTyposOnNumericTokens?: boolean | undefined
                        disableTypoToleranceOnAttributes?: string[] | undefined
                        ignorePlurals?:
                          | (
                              | 'af'
                              | 'ar'
                              | 'az'
                              | 'bg'
                              | 'bn'
                              | 'ca'
                              | 'cs'
                              | 'cy'
                              | 'da'
                              | 'de'
                              | 'el'
                              | 'en'
                              | 'eo'
                              | 'es'
                              | 'et'
                              | 'eu'
                              | 'fa'
                              | 'fi'
                              | 'fo'
                              | 'fr'
                              | 'ga'
                              | 'gl'
                              | 'he'
                              | 'hi'
                              | 'hu'
                              | 'hy'
                              | 'id'
                              | 'is'
                              | 'it'
                              | 'ja'
                              | 'ka'
                              | 'kk'
                              | 'ko'
                              | 'ku'
                              | 'ky'
                              | 'lt'
                              | 'lv'
                              | 'mi'
                              | 'mn'
                              | 'mr'
                              | 'ms'
                              | 'mt'
                              | 'nb'
                              | 'nl'
                              | 'no'
                              | 'ns'
                              | 'pl'
                              | 'ps'
                              | 'pt'
                              | 'pt-br'
                              | 'qu'
                              | 'ro'
                              | 'ru'
                              | 'sk'
                              | 'sq'
                              | 'sv'
                              | 'sw'
                              | 'ta'
                              | 'te'
                              | 'th'
                              | 'tl'
                              | 'tn'
                              | 'tr'
                              | 'tt'
                              | 'uk'
                              | 'ur'
                              | 'uz'
                              | 'zh'
                            )[]
                          | 'true'
                          | 'false'
                          | boolean
                          | undefined
                        removeStopWords?:
                          | (
                              | 'af'
                              | 'ar'
                              | 'az'
                              | 'bg'
                              | 'bn'
                              | 'ca'
                              | 'cs'
                              | 'cy'
                              | 'da'
                              | 'de'
                              | 'el'
                              | 'en'
                              | 'eo'
                              | 'es'
                              | 'et'
                              | 'eu'
                              | 'fa'
                              | 'fi'
                              | 'fo'
                              | 'fr'
                              | 'ga'
                              | 'gl'
                              | 'he'
                              | 'hi'
                              | 'hu'
                              | 'hy'
                              | 'id'
                              | 'is'
                              | 'it'
                              | 'ja'
                              | 'ka'
                              | 'kk'
                              | 'ko'
                              | 'ku'
                              | 'ky'
                              | 'lt'
                              | 'lv'
                              | 'mi'
                              | 'mn'
                              | 'mr'
                              | 'ms'
                              | 'mt'
                              | 'nb'
                              | 'nl'
                              | 'no'
                              | 'ns'
                              | 'pl'
                              | 'ps'
                              | 'pt'
                              | 'pt-br'
                              | 'qu'
                              | 'ro'
                              | 'ru'
                              | 'sk'
                              | 'sq'
                              | 'sv'
                              | 'sw'
                              | 'ta'
                              | 'te'
                              | 'th'
                              | 'tl'
                              | 'tn'
                              | 'tr'
                              | 'tt'
                              | 'uk'
                              | 'ur'
                              | 'uz'
                              | 'zh'
                            )[]
                          | boolean
                          | undefined
                        queryLanguages?:
                          | (
                              | 'af'
                              | 'ar'
                              | 'az'
                              | 'bg'
                              | 'bn'
                              | 'ca'
                              | 'cs'
                              | 'cy'
                              | 'da'
                              | 'de'
                              | 'el'
                              | 'en'
                              | 'eo'
                              | 'es'
                              | 'et'
                              | 'eu'
                              | 'fa'
                              | 'fi'
                              | 'fo'
                              | 'fr'
                              | 'ga'
                              | 'gl'
                              | 'he'
                              | 'hi'
                              | 'hu'
                              | 'hy'
                              | 'id'
                              | 'is'
                              | 'it'
                              | 'ja'
                              | 'ka'
                              | 'kk'
                              | 'ko'
                              | 'ku'
                              | 'ky'
                              | 'lt'
                              | 'lv'
                              | 'mi'
                              | 'mn'
                              | 'mr'
                              | 'ms'
                              | 'mt'
                              | 'nb'
                              | 'nl'
                              | 'no'
                              | 'ns'
                              | 'pl'
                              | 'ps'
                              | 'pt'
                              | 'pt-br'
                              | 'qu'
                              | 'ro'
                              | 'ru'
                              | 'sk'
                              | 'sq'
                              | 'sv'
                              | 'sw'
                              | 'ta'
                              | 'te'
                              | 'th'
                              | 'tl'
                              | 'tn'
                              | 'tr'
                              | 'tt'
                              | 'uk'
                              | 'ur'
                              | 'uz'
                              | 'zh'
                            )[]
                          | undefined
                        decompoundQuery?: boolean | undefined
                        enableRules?: boolean | undefined
                        enablePersonalization?: boolean | undefined
                        queryType?: 'prefixLast' | 'prefixAll' | 'prefixNone' | undefined
                        removeWordsIfNoResults?:
                          | 'none'
                          | 'lastWords'
                          | 'firstWords'
                          | 'allOptional'
                          | undefined
                        mode?: 'neuralSearch' | 'keywordSearch' | undefined
                        semanticSearch?:
                          | {
                              eventSources?:
                                | string[]
                                | ({ [x: string]: unknown } | null)
                                | undefined
                            }
                          | undefined
                        advancedSyntax?: boolean | undefined
                        optionalWords?:
                          | string
                          | ({ [x: string]: unknown } | null)
                          | string[]
                          | undefined
                        disableExactOnAttributes?: string[] | undefined
                        exactOnSingleWordQuery?: 'attribute' | 'none' | 'word' | undefined
                        alternativesAsExact?:
                          | (
                              | 'ignorePlurals'
                              | 'singleWordSynonym'
                              | 'multiWordsSynonym'
                              | 'ignoreConjugations'
                            )[]
                          | undefined
                        advancedSyntaxFeatures?: ('exactPhrase' | 'excludeWords')[] | undefined
                        distinct?: boolean | number | undefined
                        replaceSynonymsInHighlight?: boolean | undefined
                        minProximity?: number | undefined
                        responseFields?: string[] | undefined
                        maxValuesPerFacet?: number | undefined
                        sortFacetValuesBy?: string | undefined
                        attributeCriteriaComputedByMinProximity?: boolean | undefined
                        renderingContent?:
                          | {
                              facetOrdering?:
                                | {
                                    facets?: { order?: string[] | undefined } | undefined
                                    values?:
                                      | {
                                          [x: string]: {
                                            order?: string[] | undefined
                                            sortRemainingBy?:
                                              | 'count'
                                              | 'alpha'
                                              | 'hidden'
                                              | undefined
                                            hide?: string[] | undefined
                                          }
                                        }
                                      | undefined
                                  }
                                | undefined
                              redirect?: { url?: string | undefined } | undefined
                              widgets?:
                                | {
                                    banners?:
                                      | {
                                          image?:
                                            | {
                                                urls?: { url?: string | undefined }[] | undefined
                                                title?: string | undefined
                                              }
                                            | undefined
                                          link?: { url?: string | undefined } | undefined
                                        }[]
                                      | undefined
                                  }
                                | undefined
                            }
                          | undefined
                        enableReRanking?: boolean | undefined
                        reRankingApplyFilter?:
                          | unknown[]
                          | string
                          | ({ [x: string]: unknown } | null)
                          | undefined
                        query?:
                          | {
                              remove?: string[] | undefined
                              edits?:
                                | {
                                    type?: 'remove' | 'replace' | undefined
                                    delete?: string | undefined
                                    insert?: string | undefined
                                  }[]
                                | undefined
                            }
                          | string
                          | undefined
                        automaticFacetFilters?:
                          | {
                              facet: string
                              score?: number | undefined
                              disjunctive?: boolean | undefined
                            }[]
                          | string[]
                          | undefined
                        automaticOptionalFacetFilters?:
                          | {
                              facet: string
                              score?: number | undefined
                              disjunctive?: boolean | undefined
                            }[]
                          | string[]
                          | undefined
                      }
                    | undefined
                  promote?:
                    | (
                        | { objectIDs: string[]; position: number }
                        | { objectID: string; position: number }
                      )[]
                    | undefined
                  filterPromotes?: boolean | undefined
                  hide?: { objectID: string }[] | undefined
                  userData?: { [x: string]: unknown } | undefined
                }
                description?: string | undefined
                enabled?: boolean | undefined
                validity?: { from?: bigint | undefined; until?: bigint | undefined }[] | undefined
                tags?: string[] | undefined
                scope?: string | undefined
              }
            }
            output: { taskID: bigint; updatedAt: string }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { param: { indexName: string; objectID: string } } & {
              query: { forwardToReplicas?: boolean | undefined }
            } & {
              json: {
                objectID: string
                conditions?:
                  | {
                      pattern?: string | undefined
                      anchoring?: 'is' | 'startsWith' | 'endsWith' | 'contains' | undefined
                      alternatives?: boolean | undefined
                      context?: string | undefined
                      filters?: string | undefined
                    }[]
                  | undefined
                consequence: {
                  params?:
                    | {
                        similarQuery?: string | undefined
                        filters?: string | undefined
                        facetFilters?: unknown[] | string | undefined
                        optionalFilters?: unknown[] | string | undefined
                        numericFilters?: unknown[] | string | undefined
                        tagFilters?: unknown[] | string | undefined
                        sumOrFiltersScores?: boolean | undefined
                        restrictSearchableAttributes?: string[] | undefined
                        facets?: string[] | undefined
                        facetingAfterDistinct?: boolean | undefined
                        page?: number | undefined
                        offset?: number | undefined
                        length?: number | undefined
                        aroundLatLng?: string | undefined
                        aroundLatLngViaIP?: boolean | undefined
                        aroundRadius?: number | 'all' | undefined
                        aroundPrecision?:
                          | number
                          | { from?: number | undefined; value?: number | undefined }[]
                          | undefined
                        minimumAroundRadius?: number | undefined
                        insideBoundingBox?:
                          | string
                          | ({ [x: string]: unknown } | null)
                          | number[][]
                          | undefined
                        insidePolygon?: number[][] | undefined
                        naturalLanguages?:
                          | (
                              | 'af'
                              | 'ar'
                              | 'az'
                              | 'bg'
                              | 'bn'
                              | 'ca'
                              | 'cs'
                              | 'cy'
                              | 'da'
                              | 'de'
                              | 'el'
                              | 'en'
                              | 'eo'
                              | 'es'
                              | 'et'
                              | 'eu'
                              | 'fa'
                              | 'fi'
                              | 'fo'
                              | 'fr'
                              | 'ga'
                              | 'gl'
                              | 'he'
                              | 'hi'
                              | 'hu'
                              | 'hy'
                              | 'id'
                              | 'is'
                              | 'it'
                              | 'ja'
                              | 'ka'
                              | 'kk'
                              | 'ko'
                              | 'ku'
                              | 'ky'
                              | 'lt'
                              | 'lv'
                              | 'mi'
                              | 'mn'
                              | 'mr'
                              | 'ms'
                              | 'mt'
                              | 'nb'
                              | 'nl'
                              | 'no'
                              | 'ns'
                              | 'pl'
                              | 'ps'
                              | 'pt'
                              | 'pt-br'
                              | 'qu'
                              | 'ro'
                              | 'ru'
                              | 'sk'
                              | 'sq'
                              | 'sv'
                              | 'sw'
                              | 'ta'
                              | 'te'
                              | 'th'
                              | 'tl'
                              | 'tn'
                              | 'tr'
                              | 'tt'
                              | 'uk'
                              | 'ur'
                              | 'uz'
                              | 'zh'
                            )[]
                          | undefined
                        ruleContexts?: string[] | undefined
                        personalizationImpact?: number | undefined
                        userToken?: string | undefined
                        getRankingInfo?: boolean | undefined
                        synonyms?: boolean | undefined
                        clickAnalytics?: boolean | undefined
                        analytics?: boolean | undefined
                        analyticsTags?: string[] | undefined
                        percentileComputation?: boolean | undefined
                        enableABTest?: boolean | undefined
                        attributesToRetrieve?: string[] | undefined
                        ranking?: string[] | undefined
                        relevancyStrictness?: number | undefined
                        attributesToHighlight?: string[] | undefined
                        attributesToSnippet?: string[] | undefined
                        highlightPreTag?: string | undefined
                        highlightPostTag?: string | undefined
                        snippetEllipsisText?: string | undefined
                        restrictHighlightAndSnippetArrays?: boolean | undefined
                        hitsPerPage?: number | undefined
                        minWordSizefor1Typo?: number | undefined
                        minWordSizefor2Typos?: number | undefined
                        typoTolerance?: boolean | 'min' | 'strict' | 'true' | 'false' | undefined
                        allowTyposOnNumericTokens?: boolean | undefined
                        disableTypoToleranceOnAttributes?: string[] | undefined
                        ignorePlurals?:
                          | (
                              | 'af'
                              | 'ar'
                              | 'az'
                              | 'bg'
                              | 'bn'
                              | 'ca'
                              | 'cs'
                              | 'cy'
                              | 'da'
                              | 'de'
                              | 'el'
                              | 'en'
                              | 'eo'
                              | 'es'
                              | 'et'
                              | 'eu'
                              | 'fa'
                              | 'fi'
                              | 'fo'
                              | 'fr'
                              | 'ga'
                              | 'gl'
                              | 'he'
                              | 'hi'
                              | 'hu'
                              | 'hy'
                              | 'id'
                              | 'is'
                              | 'it'
                              | 'ja'
                              | 'ka'
                              | 'kk'
                              | 'ko'
                              | 'ku'
                              | 'ky'
                              | 'lt'
                              | 'lv'
                              | 'mi'
                              | 'mn'
                              | 'mr'
                              | 'ms'
                              | 'mt'
                              | 'nb'
                              | 'nl'
                              | 'no'
                              | 'ns'
                              | 'pl'
                              | 'ps'
                              | 'pt'
                              | 'pt-br'
                              | 'qu'
                              | 'ro'
                              | 'ru'
                              | 'sk'
                              | 'sq'
                              | 'sv'
                              | 'sw'
                              | 'ta'
                              | 'te'
                              | 'th'
                              | 'tl'
                              | 'tn'
                              | 'tr'
                              | 'tt'
                              | 'uk'
                              | 'ur'
                              | 'uz'
                              | 'zh'
                            )[]
                          | 'true'
                          | 'false'
                          | boolean
                          | undefined
                        removeStopWords?:
                          | (
                              | 'af'
                              | 'ar'
                              | 'az'
                              | 'bg'
                              | 'bn'
                              | 'ca'
                              | 'cs'
                              | 'cy'
                              | 'da'
                              | 'de'
                              | 'el'
                              | 'en'
                              | 'eo'
                              | 'es'
                              | 'et'
                              | 'eu'
                              | 'fa'
                              | 'fi'
                              | 'fo'
                              | 'fr'
                              | 'ga'
                              | 'gl'
                              | 'he'
                              | 'hi'
                              | 'hu'
                              | 'hy'
                              | 'id'
                              | 'is'
                              | 'it'
                              | 'ja'
                              | 'ka'
                              | 'kk'
                              | 'ko'
                              | 'ku'
                              | 'ky'
                              | 'lt'
                              | 'lv'
                              | 'mi'
                              | 'mn'
                              | 'mr'
                              | 'ms'
                              | 'mt'
                              | 'nb'
                              | 'nl'
                              | 'no'
                              | 'ns'
                              | 'pl'
                              | 'ps'
                              | 'pt'
                              | 'pt-br'
                              | 'qu'
                              | 'ro'
                              | 'ru'
                              | 'sk'
                              | 'sq'
                              | 'sv'
                              | 'sw'
                              | 'ta'
                              | 'te'
                              | 'th'
                              | 'tl'
                              | 'tn'
                              | 'tr'
                              | 'tt'
                              | 'uk'
                              | 'ur'
                              | 'uz'
                              | 'zh'
                            )[]
                          | boolean
                          | undefined
                        queryLanguages?:
                          | (
                              | 'af'
                              | 'ar'
                              | 'az'
                              | 'bg'
                              | 'bn'
                              | 'ca'
                              | 'cs'
                              | 'cy'
                              | 'da'
                              | 'de'
                              | 'el'
                              | 'en'
                              | 'eo'
                              | 'es'
                              | 'et'
                              | 'eu'
                              | 'fa'
                              | 'fi'
                              | 'fo'
                              | 'fr'
                              | 'ga'
                              | 'gl'
                              | 'he'
                              | 'hi'
                              | 'hu'
                              | 'hy'
                              | 'id'
                              | 'is'
                              | 'it'
                              | 'ja'
                              | 'ka'
                              | 'kk'
                              | 'ko'
                              | 'ku'
                              | 'ky'
                              | 'lt'
                              | 'lv'
                              | 'mi'
                              | 'mn'
                              | 'mr'
                              | 'ms'
                              | 'mt'
                              | 'nb'
                              | 'nl'
                              | 'no'
                              | 'ns'
                              | 'pl'
                              | 'ps'
                              | 'pt'
                              | 'pt-br'
                              | 'qu'
                              | 'ro'
                              | 'ru'
                              | 'sk'
                              | 'sq'
                              | 'sv'
                              | 'sw'
                              | 'ta'
                              | 'te'
                              | 'th'
                              | 'tl'
                              | 'tn'
                              | 'tr'
                              | 'tt'
                              | 'uk'
                              | 'ur'
                              | 'uz'
                              | 'zh'
                            )[]
                          | undefined
                        decompoundQuery?: boolean | undefined
                        enableRules?: boolean | undefined
                        enablePersonalization?: boolean | undefined
                        queryType?: 'prefixLast' | 'prefixAll' | 'prefixNone' | undefined
                        removeWordsIfNoResults?:
                          | 'none'
                          | 'lastWords'
                          | 'firstWords'
                          | 'allOptional'
                          | undefined
                        mode?: 'neuralSearch' | 'keywordSearch' | undefined
                        semanticSearch?:
                          | {
                              eventSources?:
                                | string[]
                                | ({ [x: string]: unknown } | null)
                                | undefined
                            }
                          | undefined
                        advancedSyntax?: boolean | undefined
                        optionalWords?:
                          | string
                          | ({ [x: string]: unknown } | null)
                          | string[]
                          | undefined
                        disableExactOnAttributes?: string[] | undefined
                        exactOnSingleWordQuery?: 'attribute' | 'none' | 'word' | undefined
                        alternativesAsExact?:
                          | (
                              | 'ignorePlurals'
                              | 'singleWordSynonym'
                              | 'multiWordsSynonym'
                              | 'ignoreConjugations'
                            )[]
                          | undefined
                        advancedSyntaxFeatures?: ('exactPhrase' | 'excludeWords')[] | undefined
                        distinct?: boolean | number | undefined
                        replaceSynonymsInHighlight?: boolean | undefined
                        minProximity?: number | undefined
                        responseFields?: string[] | undefined
                        maxValuesPerFacet?: number | undefined
                        sortFacetValuesBy?: string | undefined
                        attributeCriteriaComputedByMinProximity?: boolean | undefined
                        renderingContent?:
                          | {
                              facetOrdering?:
                                | {
                                    facets?: { order?: string[] | undefined } | undefined
                                    values?:
                                      | {
                                          [x: string]: {
                                            order?: string[] | undefined
                                            sortRemainingBy?:
                                              | 'count'
                                              | 'alpha'
                                              | 'hidden'
                                              | undefined
                                            hide?: string[] | undefined
                                          }
                                        }
                                      | undefined
                                  }
                                | undefined
                              redirect?: { url?: string | undefined } | undefined
                              widgets?:
                                | {
                                    banners?:
                                      | {
                                          image?:
                                            | {
                                                urls?: { url?: string | undefined }[] | undefined
                                                title?: string | undefined
                                              }
                                            | undefined
                                          link?: { url?: string | undefined } | undefined
                                        }[]
                                      | undefined
                                  }
                                | undefined
                            }
                          | undefined
                        enableReRanking?: boolean | undefined
                        reRankingApplyFilter?:
                          | unknown[]
                          | string
                          | ({ [x: string]: unknown } | null)
                          | undefined
                        query?:
                          | {
                              remove?: string[] | undefined
                              edits?:
                                | {
                                    type?: 'remove' | 'replace' | undefined
                                    delete?: string | undefined
                                    insert?: string | undefined
                                  }[]
                                | undefined
                            }
                          | string
                          | undefined
                        automaticFacetFilters?:
                          | {
                              facet: string
                              score?: number | undefined
                              disjunctive?: boolean | undefined
                            }[]
                          | string[]
                          | undefined
                        automaticOptionalFacetFilters?:
                          | {
                              facet: string
                              score?: number | undefined
                              disjunctive?: boolean | undefined
                            }[]
                          | string[]
                          | undefined
                      }
                    | undefined
                  promote?:
                    | (
                        | { objectIDs: string[]; position: number }
                        | { objectID: string; position: number }
                      )[]
                    | undefined
                  filterPromotes?: boolean | undefined
                  hide?: { objectID: string }[] | undefined
                  userData?: { [x: string]: unknown } | undefined
                }
                description?: string | undefined
                enabled?: boolean | undefined
                validity?: { from?: bigint | undefined; until?: bigint | undefined }[] | undefined
                tags?: string[] | undefined
                scope?: string | undefined
              }
            }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 400
          }
        | {
            input: { param: { indexName: string; objectID: string } } & {
              query: { forwardToReplicas?: boolean | undefined }
            } & {
              json: {
                objectID: string
                conditions?:
                  | {
                      pattern?: string | undefined
                      anchoring?: 'is' | 'startsWith' | 'endsWith' | 'contains' | undefined
                      alternatives?: boolean | undefined
                      context?: string | undefined
                      filters?: string | undefined
                    }[]
                  | undefined
                consequence: {
                  params?:
                    | {
                        similarQuery?: string | undefined
                        filters?: string | undefined
                        facetFilters?: unknown[] | string | undefined
                        optionalFilters?: unknown[] | string | undefined
                        numericFilters?: unknown[] | string | undefined
                        tagFilters?: unknown[] | string | undefined
                        sumOrFiltersScores?: boolean | undefined
                        restrictSearchableAttributes?: string[] | undefined
                        facets?: string[] | undefined
                        facetingAfterDistinct?: boolean | undefined
                        page?: number | undefined
                        offset?: number | undefined
                        length?: number | undefined
                        aroundLatLng?: string | undefined
                        aroundLatLngViaIP?: boolean | undefined
                        aroundRadius?: number | 'all' | undefined
                        aroundPrecision?:
                          | number
                          | { from?: number | undefined; value?: number | undefined }[]
                          | undefined
                        minimumAroundRadius?: number | undefined
                        insideBoundingBox?:
                          | string
                          | ({ [x: string]: unknown } | null)
                          | number[][]
                          | undefined
                        insidePolygon?: number[][] | undefined
                        naturalLanguages?:
                          | (
                              | 'af'
                              | 'ar'
                              | 'az'
                              | 'bg'
                              | 'bn'
                              | 'ca'
                              | 'cs'
                              | 'cy'
                              | 'da'
                              | 'de'
                              | 'el'
                              | 'en'
                              | 'eo'
                              | 'es'
                              | 'et'
                              | 'eu'
                              | 'fa'
                              | 'fi'
                              | 'fo'
                              | 'fr'
                              | 'ga'
                              | 'gl'
                              | 'he'
                              | 'hi'
                              | 'hu'
                              | 'hy'
                              | 'id'
                              | 'is'
                              | 'it'
                              | 'ja'
                              | 'ka'
                              | 'kk'
                              | 'ko'
                              | 'ku'
                              | 'ky'
                              | 'lt'
                              | 'lv'
                              | 'mi'
                              | 'mn'
                              | 'mr'
                              | 'ms'
                              | 'mt'
                              | 'nb'
                              | 'nl'
                              | 'no'
                              | 'ns'
                              | 'pl'
                              | 'ps'
                              | 'pt'
                              | 'pt-br'
                              | 'qu'
                              | 'ro'
                              | 'ru'
                              | 'sk'
                              | 'sq'
                              | 'sv'
                              | 'sw'
                              | 'ta'
                              | 'te'
                              | 'th'
                              | 'tl'
                              | 'tn'
                              | 'tr'
                              | 'tt'
                              | 'uk'
                              | 'ur'
                              | 'uz'
                              | 'zh'
                            )[]
                          | undefined
                        ruleContexts?: string[] | undefined
                        personalizationImpact?: number | undefined
                        userToken?: string | undefined
                        getRankingInfo?: boolean | undefined
                        synonyms?: boolean | undefined
                        clickAnalytics?: boolean | undefined
                        analytics?: boolean | undefined
                        analyticsTags?: string[] | undefined
                        percentileComputation?: boolean | undefined
                        enableABTest?: boolean | undefined
                        attributesToRetrieve?: string[] | undefined
                        ranking?: string[] | undefined
                        relevancyStrictness?: number | undefined
                        attributesToHighlight?: string[] | undefined
                        attributesToSnippet?: string[] | undefined
                        highlightPreTag?: string | undefined
                        highlightPostTag?: string | undefined
                        snippetEllipsisText?: string | undefined
                        restrictHighlightAndSnippetArrays?: boolean | undefined
                        hitsPerPage?: number | undefined
                        minWordSizefor1Typo?: number | undefined
                        minWordSizefor2Typos?: number | undefined
                        typoTolerance?: boolean | 'min' | 'strict' | 'true' | 'false' | undefined
                        allowTyposOnNumericTokens?: boolean | undefined
                        disableTypoToleranceOnAttributes?: string[] | undefined
                        ignorePlurals?:
                          | (
                              | 'af'
                              | 'ar'
                              | 'az'
                              | 'bg'
                              | 'bn'
                              | 'ca'
                              | 'cs'
                              | 'cy'
                              | 'da'
                              | 'de'
                              | 'el'
                              | 'en'
                              | 'eo'
                              | 'es'
                              | 'et'
                              | 'eu'
                              | 'fa'
                              | 'fi'
                              | 'fo'
                              | 'fr'
                              | 'ga'
                              | 'gl'
                              | 'he'
                              | 'hi'
                              | 'hu'
                              | 'hy'
                              | 'id'
                              | 'is'
                              | 'it'
                              | 'ja'
                              | 'ka'
                              | 'kk'
                              | 'ko'
                              | 'ku'
                              | 'ky'
                              | 'lt'
                              | 'lv'
                              | 'mi'
                              | 'mn'
                              | 'mr'
                              | 'ms'
                              | 'mt'
                              | 'nb'
                              | 'nl'
                              | 'no'
                              | 'ns'
                              | 'pl'
                              | 'ps'
                              | 'pt'
                              | 'pt-br'
                              | 'qu'
                              | 'ro'
                              | 'ru'
                              | 'sk'
                              | 'sq'
                              | 'sv'
                              | 'sw'
                              | 'ta'
                              | 'te'
                              | 'th'
                              | 'tl'
                              | 'tn'
                              | 'tr'
                              | 'tt'
                              | 'uk'
                              | 'ur'
                              | 'uz'
                              | 'zh'
                            )[]
                          | 'true'
                          | 'false'
                          | boolean
                          | undefined
                        removeStopWords?:
                          | (
                              | 'af'
                              | 'ar'
                              | 'az'
                              | 'bg'
                              | 'bn'
                              | 'ca'
                              | 'cs'
                              | 'cy'
                              | 'da'
                              | 'de'
                              | 'el'
                              | 'en'
                              | 'eo'
                              | 'es'
                              | 'et'
                              | 'eu'
                              | 'fa'
                              | 'fi'
                              | 'fo'
                              | 'fr'
                              | 'ga'
                              | 'gl'
                              | 'he'
                              | 'hi'
                              | 'hu'
                              | 'hy'
                              | 'id'
                              | 'is'
                              | 'it'
                              | 'ja'
                              | 'ka'
                              | 'kk'
                              | 'ko'
                              | 'ku'
                              | 'ky'
                              | 'lt'
                              | 'lv'
                              | 'mi'
                              | 'mn'
                              | 'mr'
                              | 'ms'
                              | 'mt'
                              | 'nb'
                              | 'nl'
                              | 'no'
                              | 'ns'
                              | 'pl'
                              | 'ps'
                              | 'pt'
                              | 'pt-br'
                              | 'qu'
                              | 'ro'
                              | 'ru'
                              | 'sk'
                              | 'sq'
                              | 'sv'
                              | 'sw'
                              | 'ta'
                              | 'te'
                              | 'th'
                              | 'tl'
                              | 'tn'
                              | 'tr'
                              | 'tt'
                              | 'uk'
                              | 'ur'
                              | 'uz'
                              | 'zh'
                            )[]
                          | boolean
                          | undefined
                        queryLanguages?:
                          | (
                              | 'af'
                              | 'ar'
                              | 'az'
                              | 'bg'
                              | 'bn'
                              | 'ca'
                              | 'cs'
                              | 'cy'
                              | 'da'
                              | 'de'
                              | 'el'
                              | 'en'
                              | 'eo'
                              | 'es'
                              | 'et'
                              | 'eu'
                              | 'fa'
                              | 'fi'
                              | 'fo'
                              | 'fr'
                              | 'ga'
                              | 'gl'
                              | 'he'
                              | 'hi'
                              | 'hu'
                              | 'hy'
                              | 'id'
                              | 'is'
                              | 'it'
                              | 'ja'
                              | 'ka'
                              | 'kk'
                              | 'ko'
                              | 'ku'
                              | 'ky'
                              | 'lt'
                              | 'lv'
                              | 'mi'
                              | 'mn'
                              | 'mr'
                              | 'ms'
                              | 'mt'
                              | 'nb'
                              | 'nl'
                              | 'no'
                              | 'ns'
                              | 'pl'
                              | 'ps'
                              | 'pt'
                              | 'pt-br'
                              | 'qu'
                              | 'ro'
                              | 'ru'
                              | 'sk'
                              | 'sq'
                              | 'sv'
                              | 'sw'
                              | 'ta'
                              | 'te'
                              | 'th'
                              | 'tl'
                              | 'tn'
                              | 'tr'
                              | 'tt'
                              | 'uk'
                              | 'ur'
                              | 'uz'
                              | 'zh'
                            )[]
                          | undefined
                        decompoundQuery?: boolean | undefined
                        enableRules?: boolean | undefined
                        enablePersonalization?: boolean | undefined
                        queryType?: 'prefixLast' | 'prefixAll' | 'prefixNone' | undefined
                        removeWordsIfNoResults?:
                          | 'none'
                          | 'lastWords'
                          | 'firstWords'
                          | 'allOptional'
                          | undefined
                        mode?: 'neuralSearch' | 'keywordSearch' | undefined
                        semanticSearch?:
                          | {
                              eventSources?:
                                | string[]
                                | ({ [x: string]: unknown } | null)
                                | undefined
                            }
                          | undefined
                        advancedSyntax?: boolean | undefined
                        optionalWords?:
                          | string
                          | ({ [x: string]: unknown } | null)
                          | string[]
                          | undefined
                        disableExactOnAttributes?: string[] | undefined
                        exactOnSingleWordQuery?: 'attribute' | 'none' | 'word' | undefined
                        alternativesAsExact?:
                          | (
                              | 'ignorePlurals'
                              | 'singleWordSynonym'
                              | 'multiWordsSynonym'
                              | 'ignoreConjugations'
                            )[]
                          | undefined
                        advancedSyntaxFeatures?: ('exactPhrase' | 'excludeWords')[] | undefined
                        distinct?: boolean | number | undefined
                        replaceSynonymsInHighlight?: boolean | undefined
                        minProximity?: number | undefined
                        responseFields?: string[] | undefined
                        maxValuesPerFacet?: number | undefined
                        sortFacetValuesBy?: string | undefined
                        attributeCriteriaComputedByMinProximity?: boolean | undefined
                        renderingContent?:
                          | {
                              facetOrdering?:
                                | {
                                    facets?: { order?: string[] | undefined } | undefined
                                    values?:
                                      | {
                                          [x: string]: {
                                            order?: string[] | undefined
                                            sortRemainingBy?:
                                              | 'count'
                                              | 'alpha'
                                              | 'hidden'
                                              | undefined
                                            hide?: string[] | undefined
                                          }
                                        }
                                      | undefined
                                  }
                                | undefined
                              redirect?: { url?: string | undefined } | undefined
                              widgets?:
                                | {
                                    banners?:
                                      | {
                                          image?:
                                            | {
                                                urls?: { url?: string | undefined }[] | undefined
                                                title?: string | undefined
                                              }
                                            | undefined
                                          link?: { url?: string | undefined } | undefined
                                        }[]
                                      | undefined
                                  }
                                | undefined
                            }
                          | undefined
                        enableReRanking?: boolean | undefined
                        reRankingApplyFilter?:
                          | unknown[]
                          | string
                          | ({ [x: string]: unknown } | null)
                          | undefined
                        query?:
                          | {
                              remove?: string[] | undefined
                              edits?:
                                | {
                                    type?: 'remove' | 'replace' | undefined
                                    delete?: string | undefined
                                    insert?: string | undefined
                                  }[]
                                | undefined
                            }
                          | string
                          | undefined
                        automaticFacetFilters?:
                          | {
                              facet: string
                              score?: number | undefined
                              disjunctive?: boolean | undefined
                            }[]
                          | string[]
                          | undefined
                        automaticOptionalFacetFilters?:
                          | {
                              facet: string
                              score?: number | undefined
                              disjunctive?: boolean | undefined
                            }[]
                          | string[]
                          | undefined
                      }
                    | undefined
                  promote?:
                    | (
                        | { objectIDs: string[]; position: number }
                        | { objectID: string; position: number }
                      )[]
                    | undefined
                  filterPromotes?: boolean | undefined
                  hide?: { objectID: string }[] | undefined
                  userData?: { [x: string]: unknown } | undefined
                }
                description?: string | undefined
                enabled?: boolean | undefined
                validity?: { from?: bigint | undefined; until?: bigint | undefined }[] | undefined
                tags?: string[] | undefined
                scope?: string | undefined
              }
            }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 402
          }
        | {
            input: { param: { indexName: string; objectID: string } } & {
              query: { forwardToReplicas?: boolean | undefined }
            } & {
              json: {
                objectID: string
                conditions?:
                  | {
                      pattern?: string | undefined
                      anchoring?: 'is' | 'startsWith' | 'endsWith' | 'contains' | undefined
                      alternatives?: boolean | undefined
                      context?: string | undefined
                      filters?: string | undefined
                    }[]
                  | undefined
                consequence: {
                  params?:
                    | {
                        similarQuery?: string | undefined
                        filters?: string | undefined
                        facetFilters?: unknown[] | string | undefined
                        optionalFilters?: unknown[] | string | undefined
                        numericFilters?: unknown[] | string | undefined
                        tagFilters?: unknown[] | string | undefined
                        sumOrFiltersScores?: boolean | undefined
                        restrictSearchableAttributes?: string[] | undefined
                        facets?: string[] | undefined
                        facetingAfterDistinct?: boolean | undefined
                        page?: number | undefined
                        offset?: number | undefined
                        length?: number | undefined
                        aroundLatLng?: string | undefined
                        aroundLatLngViaIP?: boolean | undefined
                        aroundRadius?: number | 'all' | undefined
                        aroundPrecision?:
                          | number
                          | { from?: number | undefined; value?: number | undefined }[]
                          | undefined
                        minimumAroundRadius?: number | undefined
                        insideBoundingBox?:
                          | string
                          | ({ [x: string]: unknown } | null)
                          | number[][]
                          | undefined
                        insidePolygon?: number[][] | undefined
                        naturalLanguages?:
                          | (
                              | 'af'
                              | 'ar'
                              | 'az'
                              | 'bg'
                              | 'bn'
                              | 'ca'
                              | 'cs'
                              | 'cy'
                              | 'da'
                              | 'de'
                              | 'el'
                              | 'en'
                              | 'eo'
                              | 'es'
                              | 'et'
                              | 'eu'
                              | 'fa'
                              | 'fi'
                              | 'fo'
                              | 'fr'
                              | 'ga'
                              | 'gl'
                              | 'he'
                              | 'hi'
                              | 'hu'
                              | 'hy'
                              | 'id'
                              | 'is'
                              | 'it'
                              | 'ja'
                              | 'ka'
                              | 'kk'
                              | 'ko'
                              | 'ku'
                              | 'ky'
                              | 'lt'
                              | 'lv'
                              | 'mi'
                              | 'mn'
                              | 'mr'
                              | 'ms'
                              | 'mt'
                              | 'nb'
                              | 'nl'
                              | 'no'
                              | 'ns'
                              | 'pl'
                              | 'ps'
                              | 'pt'
                              | 'pt-br'
                              | 'qu'
                              | 'ro'
                              | 'ru'
                              | 'sk'
                              | 'sq'
                              | 'sv'
                              | 'sw'
                              | 'ta'
                              | 'te'
                              | 'th'
                              | 'tl'
                              | 'tn'
                              | 'tr'
                              | 'tt'
                              | 'uk'
                              | 'ur'
                              | 'uz'
                              | 'zh'
                            )[]
                          | undefined
                        ruleContexts?: string[] | undefined
                        personalizationImpact?: number | undefined
                        userToken?: string | undefined
                        getRankingInfo?: boolean | undefined
                        synonyms?: boolean | undefined
                        clickAnalytics?: boolean | undefined
                        analytics?: boolean | undefined
                        analyticsTags?: string[] | undefined
                        percentileComputation?: boolean | undefined
                        enableABTest?: boolean | undefined
                        attributesToRetrieve?: string[] | undefined
                        ranking?: string[] | undefined
                        relevancyStrictness?: number | undefined
                        attributesToHighlight?: string[] | undefined
                        attributesToSnippet?: string[] | undefined
                        highlightPreTag?: string | undefined
                        highlightPostTag?: string | undefined
                        snippetEllipsisText?: string | undefined
                        restrictHighlightAndSnippetArrays?: boolean | undefined
                        hitsPerPage?: number | undefined
                        minWordSizefor1Typo?: number | undefined
                        minWordSizefor2Typos?: number | undefined
                        typoTolerance?: boolean | 'min' | 'strict' | 'true' | 'false' | undefined
                        allowTyposOnNumericTokens?: boolean | undefined
                        disableTypoToleranceOnAttributes?: string[] | undefined
                        ignorePlurals?:
                          | (
                              | 'af'
                              | 'ar'
                              | 'az'
                              | 'bg'
                              | 'bn'
                              | 'ca'
                              | 'cs'
                              | 'cy'
                              | 'da'
                              | 'de'
                              | 'el'
                              | 'en'
                              | 'eo'
                              | 'es'
                              | 'et'
                              | 'eu'
                              | 'fa'
                              | 'fi'
                              | 'fo'
                              | 'fr'
                              | 'ga'
                              | 'gl'
                              | 'he'
                              | 'hi'
                              | 'hu'
                              | 'hy'
                              | 'id'
                              | 'is'
                              | 'it'
                              | 'ja'
                              | 'ka'
                              | 'kk'
                              | 'ko'
                              | 'ku'
                              | 'ky'
                              | 'lt'
                              | 'lv'
                              | 'mi'
                              | 'mn'
                              | 'mr'
                              | 'ms'
                              | 'mt'
                              | 'nb'
                              | 'nl'
                              | 'no'
                              | 'ns'
                              | 'pl'
                              | 'ps'
                              | 'pt'
                              | 'pt-br'
                              | 'qu'
                              | 'ro'
                              | 'ru'
                              | 'sk'
                              | 'sq'
                              | 'sv'
                              | 'sw'
                              | 'ta'
                              | 'te'
                              | 'th'
                              | 'tl'
                              | 'tn'
                              | 'tr'
                              | 'tt'
                              | 'uk'
                              | 'ur'
                              | 'uz'
                              | 'zh'
                            )[]
                          | 'true'
                          | 'false'
                          | boolean
                          | undefined
                        removeStopWords?:
                          | (
                              | 'af'
                              | 'ar'
                              | 'az'
                              | 'bg'
                              | 'bn'
                              | 'ca'
                              | 'cs'
                              | 'cy'
                              | 'da'
                              | 'de'
                              | 'el'
                              | 'en'
                              | 'eo'
                              | 'es'
                              | 'et'
                              | 'eu'
                              | 'fa'
                              | 'fi'
                              | 'fo'
                              | 'fr'
                              | 'ga'
                              | 'gl'
                              | 'he'
                              | 'hi'
                              | 'hu'
                              | 'hy'
                              | 'id'
                              | 'is'
                              | 'it'
                              | 'ja'
                              | 'ka'
                              | 'kk'
                              | 'ko'
                              | 'ku'
                              | 'ky'
                              | 'lt'
                              | 'lv'
                              | 'mi'
                              | 'mn'
                              | 'mr'
                              | 'ms'
                              | 'mt'
                              | 'nb'
                              | 'nl'
                              | 'no'
                              | 'ns'
                              | 'pl'
                              | 'ps'
                              | 'pt'
                              | 'pt-br'
                              | 'qu'
                              | 'ro'
                              | 'ru'
                              | 'sk'
                              | 'sq'
                              | 'sv'
                              | 'sw'
                              | 'ta'
                              | 'te'
                              | 'th'
                              | 'tl'
                              | 'tn'
                              | 'tr'
                              | 'tt'
                              | 'uk'
                              | 'ur'
                              | 'uz'
                              | 'zh'
                            )[]
                          | boolean
                          | undefined
                        queryLanguages?:
                          | (
                              | 'af'
                              | 'ar'
                              | 'az'
                              | 'bg'
                              | 'bn'
                              | 'ca'
                              | 'cs'
                              | 'cy'
                              | 'da'
                              | 'de'
                              | 'el'
                              | 'en'
                              | 'eo'
                              | 'es'
                              | 'et'
                              | 'eu'
                              | 'fa'
                              | 'fi'
                              | 'fo'
                              | 'fr'
                              | 'ga'
                              | 'gl'
                              | 'he'
                              | 'hi'
                              | 'hu'
                              | 'hy'
                              | 'id'
                              | 'is'
                              | 'it'
                              | 'ja'
                              | 'ka'
                              | 'kk'
                              | 'ko'
                              | 'ku'
                              | 'ky'
                              | 'lt'
                              | 'lv'
                              | 'mi'
                              | 'mn'
                              | 'mr'
                              | 'ms'
                              | 'mt'
                              | 'nb'
                              | 'nl'
                              | 'no'
                              | 'ns'
                              | 'pl'
                              | 'ps'
                              | 'pt'
                              | 'pt-br'
                              | 'qu'
                              | 'ro'
                              | 'ru'
                              | 'sk'
                              | 'sq'
                              | 'sv'
                              | 'sw'
                              | 'ta'
                              | 'te'
                              | 'th'
                              | 'tl'
                              | 'tn'
                              | 'tr'
                              | 'tt'
                              | 'uk'
                              | 'ur'
                              | 'uz'
                              | 'zh'
                            )[]
                          | undefined
                        decompoundQuery?: boolean | undefined
                        enableRules?: boolean | undefined
                        enablePersonalization?: boolean | undefined
                        queryType?: 'prefixLast' | 'prefixAll' | 'prefixNone' | undefined
                        removeWordsIfNoResults?:
                          | 'none'
                          | 'lastWords'
                          | 'firstWords'
                          | 'allOptional'
                          | undefined
                        mode?: 'neuralSearch' | 'keywordSearch' | undefined
                        semanticSearch?:
                          | {
                              eventSources?:
                                | string[]
                                | ({ [x: string]: unknown } | null)
                                | undefined
                            }
                          | undefined
                        advancedSyntax?: boolean | undefined
                        optionalWords?:
                          | string
                          | ({ [x: string]: unknown } | null)
                          | string[]
                          | undefined
                        disableExactOnAttributes?: string[] | undefined
                        exactOnSingleWordQuery?: 'attribute' | 'none' | 'word' | undefined
                        alternativesAsExact?:
                          | (
                              | 'ignorePlurals'
                              | 'singleWordSynonym'
                              | 'multiWordsSynonym'
                              | 'ignoreConjugations'
                            )[]
                          | undefined
                        advancedSyntaxFeatures?: ('exactPhrase' | 'excludeWords')[] | undefined
                        distinct?: boolean | number | undefined
                        replaceSynonymsInHighlight?: boolean | undefined
                        minProximity?: number | undefined
                        responseFields?: string[] | undefined
                        maxValuesPerFacet?: number | undefined
                        sortFacetValuesBy?: string | undefined
                        attributeCriteriaComputedByMinProximity?: boolean | undefined
                        renderingContent?:
                          | {
                              facetOrdering?:
                                | {
                                    facets?: { order?: string[] | undefined } | undefined
                                    values?:
                                      | {
                                          [x: string]: {
                                            order?: string[] | undefined
                                            sortRemainingBy?:
                                              | 'count'
                                              | 'alpha'
                                              | 'hidden'
                                              | undefined
                                            hide?: string[] | undefined
                                          }
                                        }
                                      | undefined
                                  }
                                | undefined
                              redirect?: { url?: string | undefined } | undefined
                              widgets?:
                                | {
                                    banners?:
                                      | {
                                          image?:
                                            | {
                                                urls?: { url?: string | undefined }[] | undefined
                                                title?: string | undefined
                                              }
                                            | undefined
                                          link?: { url?: string | undefined } | undefined
                                        }[]
                                      | undefined
                                  }
                                | undefined
                            }
                          | undefined
                        enableReRanking?: boolean | undefined
                        reRankingApplyFilter?:
                          | unknown[]
                          | string
                          | ({ [x: string]: unknown } | null)
                          | undefined
                        query?:
                          | {
                              remove?: string[] | undefined
                              edits?:
                                | {
                                    type?: 'remove' | 'replace' | undefined
                                    delete?: string | undefined
                                    insert?: string | undefined
                                  }[]
                                | undefined
                            }
                          | string
                          | undefined
                        automaticFacetFilters?:
                          | {
                              facet: string
                              score?: number | undefined
                              disjunctive?: boolean | undefined
                            }[]
                          | string[]
                          | undefined
                        automaticOptionalFacetFilters?:
                          | {
                              facet: string
                              score?: number | undefined
                              disjunctive?: boolean | undefined
                            }[]
                          | string[]
                          | undefined
                      }
                    | undefined
                  promote?:
                    | (
                        | { objectIDs: string[]; position: number }
                        | { objectID: string; position: number }
                      )[]
                    | undefined
                  filterPromotes?: boolean | undefined
                  hide?: { objectID: string }[] | undefined
                  userData?: { [x: string]: unknown } | undefined
                }
                description?: string | undefined
                enabled?: boolean | undefined
                validity?: { from?: bigint | undefined; until?: bigint | undefined }[] | undefined
                tags?: string[] | undefined
                scope?: string | undefined
              }
            }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 403
          }
        | {
            input: { param: { indexName: string; objectID: string } } & {
              query: { forwardToReplicas?: boolean | undefined }
            } & {
              json: {
                objectID: string
                conditions?:
                  | {
                      pattern?: string | undefined
                      anchoring?: 'is' | 'startsWith' | 'endsWith' | 'contains' | undefined
                      alternatives?: boolean | undefined
                      context?: string | undefined
                      filters?: string | undefined
                    }[]
                  | undefined
                consequence: {
                  params?:
                    | {
                        similarQuery?: string | undefined
                        filters?: string | undefined
                        facetFilters?: unknown[] | string | undefined
                        optionalFilters?: unknown[] | string | undefined
                        numericFilters?: unknown[] | string | undefined
                        tagFilters?: unknown[] | string | undefined
                        sumOrFiltersScores?: boolean | undefined
                        restrictSearchableAttributes?: string[] | undefined
                        facets?: string[] | undefined
                        facetingAfterDistinct?: boolean | undefined
                        page?: number | undefined
                        offset?: number | undefined
                        length?: number | undefined
                        aroundLatLng?: string | undefined
                        aroundLatLngViaIP?: boolean | undefined
                        aroundRadius?: number | 'all' | undefined
                        aroundPrecision?:
                          | number
                          | { from?: number | undefined; value?: number | undefined }[]
                          | undefined
                        minimumAroundRadius?: number | undefined
                        insideBoundingBox?:
                          | string
                          | ({ [x: string]: unknown } | null)
                          | number[][]
                          | undefined
                        insidePolygon?: number[][] | undefined
                        naturalLanguages?:
                          | (
                              | 'af'
                              | 'ar'
                              | 'az'
                              | 'bg'
                              | 'bn'
                              | 'ca'
                              | 'cs'
                              | 'cy'
                              | 'da'
                              | 'de'
                              | 'el'
                              | 'en'
                              | 'eo'
                              | 'es'
                              | 'et'
                              | 'eu'
                              | 'fa'
                              | 'fi'
                              | 'fo'
                              | 'fr'
                              | 'ga'
                              | 'gl'
                              | 'he'
                              | 'hi'
                              | 'hu'
                              | 'hy'
                              | 'id'
                              | 'is'
                              | 'it'
                              | 'ja'
                              | 'ka'
                              | 'kk'
                              | 'ko'
                              | 'ku'
                              | 'ky'
                              | 'lt'
                              | 'lv'
                              | 'mi'
                              | 'mn'
                              | 'mr'
                              | 'ms'
                              | 'mt'
                              | 'nb'
                              | 'nl'
                              | 'no'
                              | 'ns'
                              | 'pl'
                              | 'ps'
                              | 'pt'
                              | 'pt-br'
                              | 'qu'
                              | 'ro'
                              | 'ru'
                              | 'sk'
                              | 'sq'
                              | 'sv'
                              | 'sw'
                              | 'ta'
                              | 'te'
                              | 'th'
                              | 'tl'
                              | 'tn'
                              | 'tr'
                              | 'tt'
                              | 'uk'
                              | 'ur'
                              | 'uz'
                              | 'zh'
                            )[]
                          | undefined
                        ruleContexts?: string[] | undefined
                        personalizationImpact?: number | undefined
                        userToken?: string | undefined
                        getRankingInfo?: boolean | undefined
                        synonyms?: boolean | undefined
                        clickAnalytics?: boolean | undefined
                        analytics?: boolean | undefined
                        analyticsTags?: string[] | undefined
                        percentileComputation?: boolean | undefined
                        enableABTest?: boolean | undefined
                        attributesToRetrieve?: string[] | undefined
                        ranking?: string[] | undefined
                        relevancyStrictness?: number | undefined
                        attributesToHighlight?: string[] | undefined
                        attributesToSnippet?: string[] | undefined
                        highlightPreTag?: string | undefined
                        highlightPostTag?: string | undefined
                        snippetEllipsisText?: string | undefined
                        restrictHighlightAndSnippetArrays?: boolean | undefined
                        hitsPerPage?: number | undefined
                        minWordSizefor1Typo?: number | undefined
                        minWordSizefor2Typos?: number | undefined
                        typoTolerance?: boolean | 'min' | 'strict' | 'true' | 'false' | undefined
                        allowTyposOnNumericTokens?: boolean | undefined
                        disableTypoToleranceOnAttributes?: string[] | undefined
                        ignorePlurals?:
                          | (
                              | 'af'
                              | 'ar'
                              | 'az'
                              | 'bg'
                              | 'bn'
                              | 'ca'
                              | 'cs'
                              | 'cy'
                              | 'da'
                              | 'de'
                              | 'el'
                              | 'en'
                              | 'eo'
                              | 'es'
                              | 'et'
                              | 'eu'
                              | 'fa'
                              | 'fi'
                              | 'fo'
                              | 'fr'
                              | 'ga'
                              | 'gl'
                              | 'he'
                              | 'hi'
                              | 'hu'
                              | 'hy'
                              | 'id'
                              | 'is'
                              | 'it'
                              | 'ja'
                              | 'ka'
                              | 'kk'
                              | 'ko'
                              | 'ku'
                              | 'ky'
                              | 'lt'
                              | 'lv'
                              | 'mi'
                              | 'mn'
                              | 'mr'
                              | 'ms'
                              | 'mt'
                              | 'nb'
                              | 'nl'
                              | 'no'
                              | 'ns'
                              | 'pl'
                              | 'ps'
                              | 'pt'
                              | 'pt-br'
                              | 'qu'
                              | 'ro'
                              | 'ru'
                              | 'sk'
                              | 'sq'
                              | 'sv'
                              | 'sw'
                              | 'ta'
                              | 'te'
                              | 'th'
                              | 'tl'
                              | 'tn'
                              | 'tr'
                              | 'tt'
                              | 'uk'
                              | 'ur'
                              | 'uz'
                              | 'zh'
                            )[]
                          | 'true'
                          | 'false'
                          | boolean
                          | undefined
                        removeStopWords?:
                          | (
                              | 'af'
                              | 'ar'
                              | 'az'
                              | 'bg'
                              | 'bn'
                              | 'ca'
                              | 'cs'
                              | 'cy'
                              | 'da'
                              | 'de'
                              | 'el'
                              | 'en'
                              | 'eo'
                              | 'es'
                              | 'et'
                              | 'eu'
                              | 'fa'
                              | 'fi'
                              | 'fo'
                              | 'fr'
                              | 'ga'
                              | 'gl'
                              | 'he'
                              | 'hi'
                              | 'hu'
                              | 'hy'
                              | 'id'
                              | 'is'
                              | 'it'
                              | 'ja'
                              | 'ka'
                              | 'kk'
                              | 'ko'
                              | 'ku'
                              | 'ky'
                              | 'lt'
                              | 'lv'
                              | 'mi'
                              | 'mn'
                              | 'mr'
                              | 'ms'
                              | 'mt'
                              | 'nb'
                              | 'nl'
                              | 'no'
                              | 'ns'
                              | 'pl'
                              | 'ps'
                              | 'pt'
                              | 'pt-br'
                              | 'qu'
                              | 'ro'
                              | 'ru'
                              | 'sk'
                              | 'sq'
                              | 'sv'
                              | 'sw'
                              | 'ta'
                              | 'te'
                              | 'th'
                              | 'tl'
                              | 'tn'
                              | 'tr'
                              | 'tt'
                              | 'uk'
                              | 'ur'
                              | 'uz'
                              | 'zh'
                            )[]
                          | boolean
                          | undefined
                        queryLanguages?:
                          | (
                              | 'af'
                              | 'ar'
                              | 'az'
                              | 'bg'
                              | 'bn'
                              | 'ca'
                              | 'cs'
                              | 'cy'
                              | 'da'
                              | 'de'
                              | 'el'
                              | 'en'
                              | 'eo'
                              | 'es'
                              | 'et'
                              | 'eu'
                              | 'fa'
                              | 'fi'
                              | 'fo'
                              | 'fr'
                              | 'ga'
                              | 'gl'
                              | 'he'
                              | 'hi'
                              | 'hu'
                              | 'hy'
                              | 'id'
                              | 'is'
                              | 'it'
                              | 'ja'
                              | 'ka'
                              | 'kk'
                              | 'ko'
                              | 'ku'
                              | 'ky'
                              | 'lt'
                              | 'lv'
                              | 'mi'
                              | 'mn'
                              | 'mr'
                              | 'ms'
                              | 'mt'
                              | 'nb'
                              | 'nl'
                              | 'no'
                              | 'ns'
                              | 'pl'
                              | 'ps'
                              | 'pt'
                              | 'pt-br'
                              | 'qu'
                              | 'ro'
                              | 'ru'
                              | 'sk'
                              | 'sq'
                              | 'sv'
                              | 'sw'
                              | 'ta'
                              | 'te'
                              | 'th'
                              | 'tl'
                              | 'tn'
                              | 'tr'
                              | 'tt'
                              | 'uk'
                              | 'ur'
                              | 'uz'
                              | 'zh'
                            )[]
                          | undefined
                        decompoundQuery?: boolean | undefined
                        enableRules?: boolean | undefined
                        enablePersonalization?: boolean | undefined
                        queryType?: 'prefixLast' | 'prefixAll' | 'prefixNone' | undefined
                        removeWordsIfNoResults?:
                          | 'none'
                          | 'lastWords'
                          | 'firstWords'
                          | 'allOptional'
                          | undefined
                        mode?: 'neuralSearch' | 'keywordSearch' | undefined
                        semanticSearch?:
                          | {
                              eventSources?:
                                | string[]
                                | ({ [x: string]: unknown } | null)
                                | undefined
                            }
                          | undefined
                        advancedSyntax?: boolean | undefined
                        optionalWords?:
                          | string
                          | ({ [x: string]: unknown } | null)
                          | string[]
                          | undefined
                        disableExactOnAttributes?: string[] | undefined
                        exactOnSingleWordQuery?: 'attribute' | 'none' | 'word' | undefined
                        alternativesAsExact?:
                          | (
                              | 'ignorePlurals'
                              | 'singleWordSynonym'
                              | 'multiWordsSynonym'
                              | 'ignoreConjugations'
                            )[]
                          | undefined
                        advancedSyntaxFeatures?: ('exactPhrase' | 'excludeWords')[] | undefined
                        distinct?: boolean | number | undefined
                        replaceSynonymsInHighlight?: boolean | undefined
                        minProximity?: number | undefined
                        responseFields?: string[] | undefined
                        maxValuesPerFacet?: number | undefined
                        sortFacetValuesBy?: string | undefined
                        attributeCriteriaComputedByMinProximity?: boolean | undefined
                        renderingContent?:
                          | {
                              facetOrdering?:
                                | {
                                    facets?: { order?: string[] | undefined } | undefined
                                    values?:
                                      | {
                                          [x: string]: {
                                            order?: string[] | undefined
                                            sortRemainingBy?:
                                              | 'count'
                                              | 'alpha'
                                              | 'hidden'
                                              | undefined
                                            hide?: string[] | undefined
                                          }
                                        }
                                      | undefined
                                  }
                                | undefined
                              redirect?: { url?: string | undefined } | undefined
                              widgets?:
                                | {
                                    banners?:
                                      | {
                                          image?:
                                            | {
                                                urls?: { url?: string | undefined }[] | undefined
                                                title?: string | undefined
                                              }
                                            | undefined
                                          link?: { url?: string | undefined } | undefined
                                        }[]
                                      | undefined
                                  }
                                | undefined
                            }
                          | undefined
                        enableReRanking?: boolean | undefined
                        reRankingApplyFilter?:
                          | unknown[]
                          | string
                          | ({ [x: string]: unknown } | null)
                          | undefined
                        query?:
                          | {
                              remove?: string[] | undefined
                              edits?:
                                | {
                                    type?: 'remove' | 'replace' | undefined
                                    delete?: string | undefined
                                    insert?: string | undefined
                                  }[]
                                | undefined
                            }
                          | string
                          | undefined
                        automaticFacetFilters?:
                          | {
                              facet: string
                              score?: number | undefined
                              disjunctive?: boolean | undefined
                            }[]
                          | string[]
                          | undefined
                        automaticOptionalFacetFilters?:
                          | {
                              facet: string
                              score?: number | undefined
                              disjunctive?: boolean | undefined
                            }[]
                          | string[]
                          | undefined
                      }
                    | undefined
                  promote?:
                    | (
                        | { objectIDs: string[]; position: number }
                        | { objectID: string; position: number }
                      )[]
                    | undefined
                  filterPromotes?: boolean | undefined
                  hide?: { objectID: string }[] | undefined
                  userData?: { [x: string]: unknown } | undefined
                }
                description?: string | undefined
                enabled?: boolean | undefined
                validity?: { from?: bigint | undefined; until?: bigint | undefined }[] | undefined
                tags?: string[] | undefined
                scope?: string | undefined
              }
            }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 404
          }
      $delete:
        | {
            input: { param: { indexName: string; objectID: string } } & {
              query: { forwardToReplicas?: boolean | undefined }
            }
            output: { taskID: bigint; updatedAt: string }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { param: { indexName: string; objectID: string } } & {
              query: { forwardToReplicas?: boolean | undefined }
            }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 400
          }
        | {
            input: { param: { indexName: string; objectID: string } } & {
              query: { forwardToReplicas?: boolean | undefined }
            }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 402
          }
        | {
            input: { param: { indexName: string; objectID: string } } & {
              query: { forwardToReplicas?: boolean | undefined }
            }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 403
          }
        | {
            input: { param: { indexName: string; objectID: string } } & {
              query: { forwardToReplicas?: boolean | undefined }
            }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 404
          }
    }
  } & {
    '/1/indexes/:indexName/rules/batch': {
      $post:
        | {
            input: { param: { indexName: string } } & {
              query: {
                forwardToReplicas?: boolean | undefined
                clearExistingRules?: boolean | undefined
              }
            } & {
              json: {
                objectID: string
                conditions?:
                  | {
                      pattern?: string | undefined
                      anchoring?: 'is' | 'startsWith' | 'endsWith' | 'contains' | undefined
                      alternatives?: boolean | undefined
                      context?: string | undefined
                      filters?: string | undefined
                    }[]
                  | undefined
                consequence: {
                  params?:
                    | {
                        similarQuery?: string | undefined
                        filters?: string | undefined
                        facetFilters?: unknown[] | string | undefined
                        optionalFilters?: unknown[] | string | undefined
                        numericFilters?: unknown[] | string | undefined
                        tagFilters?: unknown[] | string | undefined
                        sumOrFiltersScores?: boolean | undefined
                        restrictSearchableAttributes?: string[] | undefined
                        facets?: string[] | undefined
                        facetingAfterDistinct?: boolean | undefined
                        page?: number | undefined
                        offset?: number | undefined
                        length?: number | undefined
                        aroundLatLng?: string | undefined
                        aroundLatLngViaIP?: boolean | undefined
                        aroundRadius?: number | 'all' | undefined
                        aroundPrecision?:
                          | number
                          | { from?: number | undefined; value?: number | undefined }[]
                          | undefined
                        minimumAroundRadius?: number | undefined
                        insideBoundingBox?:
                          | string
                          | ({ [x: string]: unknown } | null)
                          | number[][]
                          | undefined
                        insidePolygon?: number[][] | undefined
                        naturalLanguages?:
                          | (
                              | 'af'
                              | 'ar'
                              | 'az'
                              | 'bg'
                              | 'bn'
                              | 'ca'
                              | 'cs'
                              | 'cy'
                              | 'da'
                              | 'de'
                              | 'el'
                              | 'en'
                              | 'eo'
                              | 'es'
                              | 'et'
                              | 'eu'
                              | 'fa'
                              | 'fi'
                              | 'fo'
                              | 'fr'
                              | 'ga'
                              | 'gl'
                              | 'he'
                              | 'hi'
                              | 'hu'
                              | 'hy'
                              | 'id'
                              | 'is'
                              | 'it'
                              | 'ja'
                              | 'ka'
                              | 'kk'
                              | 'ko'
                              | 'ku'
                              | 'ky'
                              | 'lt'
                              | 'lv'
                              | 'mi'
                              | 'mn'
                              | 'mr'
                              | 'ms'
                              | 'mt'
                              | 'nb'
                              | 'nl'
                              | 'no'
                              | 'ns'
                              | 'pl'
                              | 'ps'
                              | 'pt'
                              | 'pt-br'
                              | 'qu'
                              | 'ro'
                              | 'ru'
                              | 'sk'
                              | 'sq'
                              | 'sv'
                              | 'sw'
                              | 'ta'
                              | 'te'
                              | 'th'
                              | 'tl'
                              | 'tn'
                              | 'tr'
                              | 'tt'
                              | 'uk'
                              | 'ur'
                              | 'uz'
                              | 'zh'
                            )[]
                          | undefined
                        ruleContexts?: string[] | undefined
                        personalizationImpact?: number | undefined
                        userToken?: string | undefined
                        getRankingInfo?: boolean | undefined
                        synonyms?: boolean | undefined
                        clickAnalytics?: boolean | undefined
                        analytics?: boolean | undefined
                        analyticsTags?: string[] | undefined
                        percentileComputation?: boolean | undefined
                        enableABTest?: boolean | undefined
                        attributesToRetrieve?: string[] | undefined
                        ranking?: string[] | undefined
                        relevancyStrictness?: number | undefined
                        attributesToHighlight?: string[] | undefined
                        attributesToSnippet?: string[] | undefined
                        highlightPreTag?: string | undefined
                        highlightPostTag?: string | undefined
                        snippetEllipsisText?: string | undefined
                        restrictHighlightAndSnippetArrays?: boolean | undefined
                        hitsPerPage?: number | undefined
                        minWordSizefor1Typo?: number | undefined
                        minWordSizefor2Typos?: number | undefined
                        typoTolerance?: boolean | 'min' | 'strict' | 'true' | 'false' | undefined
                        allowTyposOnNumericTokens?: boolean | undefined
                        disableTypoToleranceOnAttributes?: string[] | undefined
                        ignorePlurals?:
                          | (
                              | 'af'
                              | 'ar'
                              | 'az'
                              | 'bg'
                              | 'bn'
                              | 'ca'
                              | 'cs'
                              | 'cy'
                              | 'da'
                              | 'de'
                              | 'el'
                              | 'en'
                              | 'eo'
                              | 'es'
                              | 'et'
                              | 'eu'
                              | 'fa'
                              | 'fi'
                              | 'fo'
                              | 'fr'
                              | 'ga'
                              | 'gl'
                              | 'he'
                              | 'hi'
                              | 'hu'
                              | 'hy'
                              | 'id'
                              | 'is'
                              | 'it'
                              | 'ja'
                              | 'ka'
                              | 'kk'
                              | 'ko'
                              | 'ku'
                              | 'ky'
                              | 'lt'
                              | 'lv'
                              | 'mi'
                              | 'mn'
                              | 'mr'
                              | 'ms'
                              | 'mt'
                              | 'nb'
                              | 'nl'
                              | 'no'
                              | 'ns'
                              | 'pl'
                              | 'ps'
                              | 'pt'
                              | 'pt-br'
                              | 'qu'
                              | 'ro'
                              | 'ru'
                              | 'sk'
                              | 'sq'
                              | 'sv'
                              | 'sw'
                              | 'ta'
                              | 'te'
                              | 'th'
                              | 'tl'
                              | 'tn'
                              | 'tr'
                              | 'tt'
                              | 'uk'
                              | 'ur'
                              | 'uz'
                              | 'zh'
                            )[]
                          | 'true'
                          | 'false'
                          | boolean
                          | undefined
                        removeStopWords?:
                          | (
                              | 'af'
                              | 'ar'
                              | 'az'
                              | 'bg'
                              | 'bn'
                              | 'ca'
                              | 'cs'
                              | 'cy'
                              | 'da'
                              | 'de'
                              | 'el'
                              | 'en'
                              | 'eo'
                              | 'es'
                              | 'et'
                              | 'eu'
                              | 'fa'
                              | 'fi'
                              | 'fo'
                              | 'fr'
                              | 'ga'
                              | 'gl'
                              | 'he'
                              | 'hi'
                              | 'hu'
                              | 'hy'
                              | 'id'
                              | 'is'
                              | 'it'
                              | 'ja'
                              | 'ka'
                              | 'kk'
                              | 'ko'
                              | 'ku'
                              | 'ky'
                              | 'lt'
                              | 'lv'
                              | 'mi'
                              | 'mn'
                              | 'mr'
                              | 'ms'
                              | 'mt'
                              | 'nb'
                              | 'nl'
                              | 'no'
                              | 'ns'
                              | 'pl'
                              | 'ps'
                              | 'pt'
                              | 'pt-br'
                              | 'qu'
                              | 'ro'
                              | 'ru'
                              | 'sk'
                              | 'sq'
                              | 'sv'
                              | 'sw'
                              | 'ta'
                              | 'te'
                              | 'th'
                              | 'tl'
                              | 'tn'
                              | 'tr'
                              | 'tt'
                              | 'uk'
                              | 'ur'
                              | 'uz'
                              | 'zh'
                            )[]
                          | boolean
                          | undefined
                        queryLanguages?:
                          | (
                              | 'af'
                              | 'ar'
                              | 'az'
                              | 'bg'
                              | 'bn'
                              | 'ca'
                              | 'cs'
                              | 'cy'
                              | 'da'
                              | 'de'
                              | 'el'
                              | 'en'
                              | 'eo'
                              | 'es'
                              | 'et'
                              | 'eu'
                              | 'fa'
                              | 'fi'
                              | 'fo'
                              | 'fr'
                              | 'ga'
                              | 'gl'
                              | 'he'
                              | 'hi'
                              | 'hu'
                              | 'hy'
                              | 'id'
                              | 'is'
                              | 'it'
                              | 'ja'
                              | 'ka'
                              | 'kk'
                              | 'ko'
                              | 'ku'
                              | 'ky'
                              | 'lt'
                              | 'lv'
                              | 'mi'
                              | 'mn'
                              | 'mr'
                              | 'ms'
                              | 'mt'
                              | 'nb'
                              | 'nl'
                              | 'no'
                              | 'ns'
                              | 'pl'
                              | 'ps'
                              | 'pt'
                              | 'pt-br'
                              | 'qu'
                              | 'ro'
                              | 'ru'
                              | 'sk'
                              | 'sq'
                              | 'sv'
                              | 'sw'
                              | 'ta'
                              | 'te'
                              | 'th'
                              | 'tl'
                              | 'tn'
                              | 'tr'
                              | 'tt'
                              | 'uk'
                              | 'ur'
                              | 'uz'
                              | 'zh'
                            )[]
                          | undefined
                        decompoundQuery?: boolean | undefined
                        enableRules?: boolean | undefined
                        enablePersonalization?: boolean | undefined
                        queryType?: 'prefixLast' | 'prefixAll' | 'prefixNone' | undefined
                        removeWordsIfNoResults?:
                          | 'none'
                          | 'lastWords'
                          | 'firstWords'
                          | 'allOptional'
                          | undefined
                        mode?: 'neuralSearch' | 'keywordSearch' | undefined
                        semanticSearch?:
                          | {
                              eventSources?:
                                | string[]
                                | ({ [x: string]: unknown } | null)
                                | undefined
                            }
                          | undefined
                        advancedSyntax?: boolean | undefined
                        optionalWords?:
                          | string
                          | ({ [x: string]: unknown } | null)
                          | string[]
                          | undefined
                        disableExactOnAttributes?: string[] | undefined
                        exactOnSingleWordQuery?: 'attribute' | 'none' | 'word' | undefined
                        alternativesAsExact?:
                          | (
                              | 'ignorePlurals'
                              | 'singleWordSynonym'
                              | 'multiWordsSynonym'
                              | 'ignoreConjugations'
                            )[]
                          | undefined
                        advancedSyntaxFeatures?: ('exactPhrase' | 'excludeWords')[] | undefined
                        distinct?: boolean | number | undefined
                        replaceSynonymsInHighlight?: boolean | undefined
                        minProximity?: number | undefined
                        responseFields?: string[] | undefined
                        maxValuesPerFacet?: number | undefined
                        sortFacetValuesBy?: string | undefined
                        attributeCriteriaComputedByMinProximity?: boolean | undefined
                        renderingContent?:
                          | {
                              facetOrdering?:
                                | {
                                    facets?: { order?: string[] | undefined } | undefined
                                    values?:
                                      | {
                                          [x: string]: {
                                            order?: string[] | undefined
                                            sortRemainingBy?:
                                              | 'count'
                                              | 'alpha'
                                              | 'hidden'
                                              | undefined
                                            hide?: string[] | undefined
                                          }
                                        }
                                      | undefined
                                  }
                                | undefined
                              redirect?: { url?: string | undefined } | undefined
                              widgets?:
                                | {
                                    banners?:
                                      | {
                                          image?:
                                            | {
                                                urls?: { url?: string | undefined }[] | undefined
                                                title?: string | undefined
                                              }
                                            | undefined
                                          link?: { url?: string | undefined } | undefined
                                        }[]
                                      | undefined
                                  }
                                | undefined
                            }
                          | undefined
                        enableReRanking?: boolean | undefined
                        reRankingApplyFilter?:
                          | unknown[]
                          | string
                          | ({ [x: string]: unknown } | null)
                          | undefined
                        query?:
                          | {
                              remove?: string[] | undefined
                              edits?:
                                | {
                                    type?: 'remove' | 'replace' | undefined
                                    delete?: string | undefined
                                    insert?: string | undefined
                                  }[]
                                | undefined
                            }
                          | string
                          | undefined
                        automaticFacetFilters?:
                          | {
                              facet: string
                              score?: number | undefined
                              disjunctive?: boolean | undefined
                            }[]
                          | string[]
                          | undefined
                        automaticOptionalFacetFilters?:
                          | {
                              facet: string
                              score?: number | undefined
                              disjunctive?: boolean | undefined
                            }[]
                          | string[]
                          | undefined
                      }
                    | undefined
                  promote?:
                    | (
                        | { objectIDs: string[]; position: number }
                        | { objectID: string; position: number }
                      )[]
                    | undefined
                  filterPromotes?: boolean | undefined
                  hide?: { objectID: string }[] | undefined
                  userData?: { [x: string]: unknown } | undefined
                }
                description?: string | undefined
                enabled?: boolean | undefined
                validity?: { from?: bigint | undefined; until?: bigint | undefined }[] | undefined
                tags?: string[] | undefined
                scope?: string | undefined
              }[]
            }
            output: { taskID: bigint; updatedAt: string }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { param: { indexName: string } } & {
              query: {
                forwardToReplicas?: boolean | undefined
                clearExistingRules?: boolean | undefined
              }
            } & {
              json: {
                objectID: string
                conditions?:
                  | {
                      pattern?: string | undefined
                      anchoring?: 'is' | 'startsWith' | 'endsWith' | 'contains' | undefined
                      alternatives?: boolean | undefined
                      context?: string | undefined
                      filters?: string | undefined
                    }[]
                  | undefined
                consequence: {
                  params?:
                    | {
                        similarQuery?: string | undefined
                        filters?: string | undefined
                        facetFilters?: unknown[] | string | undefined
                        optionalFilters?: unknown[] | string | undefined
                        numericFilters?: unknown[] | string | undefined
                        tagFilters?: unknown[] | string | undefined
                        sumOrFiltersScores?: boolean | undefined
                        restrictSearchableAttributes?: string[] | undefined
                        facets?: string[] | undefined
                        facetingAfterDistinct?: boolean | undefined
                        page?: number | undefined
                        offset?: number | undefined
                        length?: number | undefined
                        aroundLatLng?: string | undefined
                        aroundLatLngViaIP?: boolean | undefined
                        aroundRadius?: number | 'all' | undefined
                        aroundPrecision?:
                          | number
                          | { from?: number | undefined; value?: number | undefined }[]
                          | undefined
                        minimumAroundRadius?: number | undefined
                        insideBoundingBox?:
                          | string
                          | ({ [x: string]: unknown } | null)
                          | number[][]
                          | undefined
                        insidePolygon?: number[][] | undefined
                        naturalLanguages?:
                          | (
                              | 'af'
                              | 'ar'
                              | 'az'
                              | 'bg'
                              | 'bn'
                              | 'ca'
                              | 'cs'
                              | 'cy'
                              | 'da'
                              | 'de'
                              | 'el'
                              | 'en'
                              | 'eo'
                              | 'es'
                              | 'et'
                              | 'eu'
                              | 'fa'
                              | 'fi'
                              | 'fo'
                              | 'fr'
                              | 'ga'
                              | 'gl'
                              | 'he'
                              | 'hi'
                              | 'hu'
                              | 'hy'
                              | 'id'
                              | 'is'
                              | 'it'
                              | 'ja'
                              | 'ka'
                              | 'kk'
                              | 'ko'
                              | 'ku'
                              | 'ky'
                              | 'lt'
                              | 'lv'
                              | 'mi'
                              | 'mn'
                              | 'mr'
                              | 'ms'
                              | 'mt'
                              | 'nb'
                              | 'nl'
                              | 'no'
                              | 'ns'
                              | 'pl'
                              | 'ps'
                              | 'pt'
                              | 'pt-br'
                              | 'qu'
                              | 'ro'
                              | 'ru'
                              | 'sk'
                              | 'sq'
                              | 'sv'
                              | 'sw'
                              | 'ta'
                              | 'te'
                              | 'th'
                              | 'tl'
                              | 'tn'
                              | 'tr'
                              | 'tt'
                              | 'uk'
                              | 'ur'
                              | 'uz'
                              | 'zh'
                            )[]
                          | undefined
                        ruleContexts?: string[] | undefined
                        personalizationImpact?: number | undefined
                        userToken?: string | undefined
                        getRankingInfo?: boolean | undefined
                        synonyms?: boolean | undefined
                        clickAnalytics?: boolean | undefined
                        analytics?: boolean | undefined
                        analyticsTags?: string[] | undefined
                        percentileComputation?: boolean | undefined
                        enableABTest?: boolean | undefined
                        attributesToRetrieve?: string[] | undefined
                        ranking?: string[] | undefined
                        relevancyStrictness?: number | undefined
                        attributesToHighlight?: string[] | undefined
                        attributesToSnippet?: string[] | undefined
                        highlightPreTag?: string | undefined
                        highlightPostTag?: string | undefined
                        snippetEllipsisText?: string | undefined
                        restrictHighlightAndSnippetArrays?: boolean | undefined
                        hitsPerPage?: number | undefined
                        minWordSizefor1Typo?: number | undefined
                        minWordSizefor2Typos?: number | undefined
                        typoTolerance?: boolean | 'min' | 'strict' | 'true' | 'false' | undefined
                        allowTyposOnNumericTokens?: boolean | undefined
                        disableTypoToleranceOnAttributes?: string[] | undefined
                        ignorePlurals?:
                          | (
                              | 'af'
                              | 'ar'
                              | 'az'
                              | 'bg'
                              | 'bn'
                              | 'ca'
                              | 'cs'
                              | 'cy'
                              | 'da'
                              | 'de'
                              | 'el'
                              | 'en'
                              | 'eo'
                              | 'es'
                              | 'et'
                              | 'eu'
                              | 'fa'
                              | 'fi'
                              | 'fo'
                              | 'fr'
                              | 'ga'
                              | 'gl'
                              | 'he'
                              | 'hi'
                              | 'hu'
                              | 'hy'
                              | 'id'
                              | 'is'
                              | 'it'
                              | 'ja'
                              | 'ka'
                              | 'kk'
                              | 'ko'
                              | 'ku'
                              | 'ky'
                              | 'lt'
                              | 'lv'
                              | 'mi'
                              | 'mn'
                              | 'mr'
                              | 'ms'
                              | 'mt'
                              | 'nb'
                              | 'nl'
                              | 'no'
                              | 'ns'
                              | 'pl'
                              | 'ps'
                              | 'pt'
                              | 'pt-br'
                              | 'qu'
                              | 'ro'
                              | 'ru'
                              | 'sk'
                              | 'sq'
                              | 'sv'
                              | 'sw'
                              | 'ta'
                              | 'te'
                              | 'th'
                              | 'tl'
                              | 'tn'
                              | 'tr'
                              | 'tt'
                              | 'uk'
                              | 'ur'
                              | 'uz'
                              | 'zh'
                            )[]
                          | 'true'
                          | 'false'
                          | boolean
                          | undefined
                        removeStopWords?:
                          | (
                              | 'af'
                              | 'ar'
                              | 'az'
                              | 'bg'
                              | 'bn'
                              | 'ca'
                              | 'cs'
                              | 'cy'
                              | 'da'
                              | 'de'
                              | 'el'
                              | 'en'
                              | 'eo'
                              | 'es'
                              | 'et'
                              | 'eu'
                              | 'fa'
                              | 'fi'
                              | 'fo'
                              | 'fr'
                              | 'ga'
                              | 'gl'
                              | 'he'
                              | 'hi'
                              | 'hu'
                              | 'hy'
                              | 'id'
                              | 'is'
                              | 'it'
                              | 'ja'
                              | 'ka'
                              | 'kk'
                              | 'ko'
                              | 'ku'
                              | 'ky'
                              | 'lt'
                              | 'lv'
                              | 'mi'
                              | 'mn'
                              | 'mr'
                              | 'ms'
                              | 'mt'
                              | 'nb'
                              | 'nl'
                              | 'no'
                              | 'ns'
                              | 'pl'
                              | 'ps'
                              | 'pt'
                              | 'pt-br'
                              | 'qu'
                              | 'ro'
                              | 'ru'
                              | 'sk'
                              | 'sq'
                              | 'sv'
                              | 'sw'
                              | 'ta'
                              | 'te'
                              | 'th'
                              | 'tl'
                              | 'tn'
                              | 'tr'
                              | 'tt'
                              | 'uk'
                              | 'ur'
                              | 'uz'
                              | 'zh'
                            )[]
                          | boolean
                          | undefined
                        queryLanguages?:
                          | (
                              | 'af'
                              | 'ar'
                              | 'az'
                              | 'bg'
                              | 'bn'
                              | 'ca'
                              | 'cs'
                              | 'cy'
                              | 'da'
                              | 'de'
                              | 'el'
                              | 'en'
                              | 'eo'
                              | 'es'
                              | 'et'
                              | 'eu'
                              | 'fa'
                              | 'fi'
                              | 'fo'
                              | 'fr'
                              | 'ga'
                              | 'gl'
                              | 'he'
                              | 'hi'
                              | 'hu'
                              | 'hy'
                              | 'id'
                              | 'is'
                              | 'it'
                              | 'ja'
                              | 'ka'
                              | 'kk'
                              | 'ko'
                              | 'ku'
                              | 'ky'
                              | 'lt'
                              | 'lv'
                              | 'mi'
                              | 'mn'
                              | 'mr'
                              | 'ms'
                              | 'mt'
                              | 'nb'
                              | 'nl'
                              | 'no'
                              | 'ns'
                              | 'pl'
                              | 'ps'
                              | 'pt'
                              | 'pt-br'
                              | 'qu'
                              | 'ro'
                              | 'ru'
                              | 'sk'
                              | 'sq'
                              | 'sv'
                              | 'sw'
                              | 'ta'
                              | 'te'
                              | 'th'
                              | 'tl'
                              | 'tn'
                              | 'tr'
                              | 'tt'
                              | 'uk'
                              | 'ur'
                              | 'uz'
                              | 'zh'
                            )[]
                          | undefined
                        decompoundQuery?: boolean | undefined
                        enableRules?: boolean | undefined
                        enablePersonalization?: boolean | undefined
                        queryType?: 'prefixLast' | 'prefixAll' | 'prefixNone' | undefined
                        removeWordsIfNoResults?:
                          | 'none'
                          | 'lastWords'
                          | 'firstWords'
                          | 'allOptional'
                          | undefined
                        mode?: 'neuralSearch' | 'keywordSearch' | undefined
                        semanticSearch?:
                          | {
                              eventSources?:
                                | string[]
                                | ({ [x: string]: unknown } | null)
                                | undefined
                            }
                          | undefined
                        advancedSyntax?: boolean | undefined
                        optionalWords?:
                          | string
                          | ({ [x: string]: unknown } | null)
                          | string[]
                          | undefined
                        disableExactOnAttributes?: string[] | undefined
                        exactOnSingleWordQuery?: 'attribute' | 'none' | 'word' | undefined
                        alternativesAsExact?:
                          | (
                              | 'ignorePlurals'
                              | 'singleWordSynonym'
                              | 'multiWordsSynonym'
                              | 'ignoreConjugations'
                            )[]
                          | undefined
                        advancedSyntaxFeatures?: ('exactPhrase' | 'excludeWords')[] | undefined
                        distinct?: boolean | number | undefined
                        replaceSynonymsInHighlight?: boolean | undefined
                        minProximity?: number | undefined
                        responseFields?: string[] | undefined
                        maxValuesPerFacet?: number | undefined
                        sortFacetValuesBy?: string | undefined
                        attributeCriteriaComputedByMinProximity?: boolean | undefined
                        renderingContent?:
                          | {
                              facetOrdering?:
                                | {
                                    facets?: { order?: string[] | undefined } | undefined
                                    values?:
                                      | {
                                          [x: string]: {
                                            order?: string[] | undefined
                                            sortRemainingBy?:
                                              | 'count'
                                              | 'alpha'
                                              | 'hidden'
                                              | undefined
                                            hide?: string[] | undefined
                                          }
                                        }
                                      | undefined
                                  }
                                | undefined
                              redirect?: { url?: string | undefined } | undefined
                              widgets?:
                                | {
                                    banners?:
                                      | {
                                          image?:
                                            | {
                                                urls?: { url?: string | undefined }[] | undefined
                                                title?: string | undefined
                                              }
                                            | undefined
                                          link?: { url?: string | undefined } | undefined
                                        }[]
                                      | undefined
                                  }
                                | undefined
                            }
                          | undefined
                        enableReRanking?: boolean | undefined
                        reRankingApplyFilter?:
                          | unknown[]
                          | string
                          | ({ [x: string]: unknown } | null)
                          | undefined
                        query?:
                          | {
                              remove?: string[] | undefined
                              edits?:
                                | {
                                    type?: 'remove' | 'replace' | undefined
                                    delete?: string | undefined
                                    insert?: string | undefined
                                  }[]
                                | undefined
                            }
                          | string
                          | undefined
                        automaticFacetFilters?:
                          | {
                              facet: string
                              score?: number | undefined
                              disjunctive?: boolean | undefined
                            }[]
                          | string[]
                          | undefined
                        automaticOptionalFacetFilters?:
                          | {
                              facet: string
                              score?: number | undefined
                              disjunctive?: boolean | undefined
                            }[]
                          | string[]
                          | undefined
                      }
                    | undefined
                  promote?:
                    | (
                        | { objectIDs: string[]; position: number }
                        | { objectID: string; position: number }
                      )[]
                    | undefined
                  filterPromotes?: boolean | undefined
                  hide?: { objectID: string }[] | undefined
                  userData?: { [x: string]: unknown } | undefined
                }
                description?: string | undefined
                enabled?: boolean | undefined
                validity?: { from?: bigint | undefined; until?: bigint | undefined }[] | undefined
                tags?: string[] | undefined
                scope?: string | undefined
              }[]
            }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 400
          }
        | {
            input: { param: { indexName: string } } & {
              query: {
                forwardToReplicas?: boolean | undefined
                clearExistingRules?: boolean | undefined
              }
            } & {
              json: {
                objectID: string
                conditions?:
                  | {
                      pattern?: string | undefined
                      anchoring?: 'is' | 'startsWith' | 'endsWith' | 'contains' | undefined
                      alternatives?: boolean | undefined
                      context?: string | undefined
                      filters?: string | undefined
                    }[]
                  | undefined
                consequence: {
                  params?:
                    | {
                        similarQuery?: string | undefined
                        filters?: string | undefined
                        facetFilters?: unknown[] | string | undefined
                        optionalFilters?: unknown[] | string | undefined
                        numericFilters?: unknown[] | string | undefined
                        tagFilters?: unknown[] | string | undefined
                        sumOrFiltersScores?: boolean | undefined
                        restrictSearchableAttributes?: string[] | undefined
                        facets?: string[] | undefined
                        facetingAfterDistinct?: boolean | undefined
                        page?: number | undefined
                        offset?: number | undefined
                        length?: number | undefined
                        aroundLatLng?: string | undefined
                        aroundLatLngViaIP?: boolean | undefined
                        aroundRadius?: number | 'all' | undefined
                        aroundPrecision?:
                          | number
                          | { from?: number | undefined; value?: number | undefined }[]
                          | undefined
                        minimumAroundRadius?: number | undefined
                        insideBoundingBox?:
                          | string
                          | ({ [x: string]: unknown } | null)
                          | number[][]
                          | undefined
                        insidePolygon?: number[][] | undefined
                        naturalLanguages?:
                          | (
                              | 'af'
                              | 'ar'
                              | 'az'
                              | 'bg'
                              | 'bn'
                              | 'ca'
                              | 'cs'
                              | 'cy'
                              | 'da'
                              | 'de'
                              | 'el'
                              | 'en'
                              | 'eo'
                              | 'es'
                              | 'et'
                              | 'eu'
                              | 'fa'
                              | 'fi'
                              | 'fo'
                              | 'fr'
                              | 'ga'
                              | 'gl'
                              | 'he'
                              | 'hi'
                              | 'hu'
                              | 'hy'
                              | 'id'
                              | 'is'
                              | 'it'
                              | 'ja'
                              | 'ka'
                              | 'kk'
                              | 'ko'
                              | 'ku'
                              | 'ky'
                              | 'lt'
                              | 'lv'
                              | 'mi'
                              | 'mn'
                              | 'mr'
                              | 'ms'
                              | 'mt'
                              | 'nb'
                              | 'nl'
                              | 'no'
                              | 'ns'
                              | 'pl'
                              | 'ps'
                              | 'pt'
                              | 'pt-br'
                              | 'qu'
                              | 'ro'
                              | 'ru'
                              | 'sk'
                              | 'sq'
                              | 'sv'
                              | 'sw'
                              | 'ta'
                              | 'te'
                              | 'th'
                              | 'tl'
                              | 'tn'
                              | 'tr'
                              | 'tt'
                              | 'uk'
                              | 'ur'
                              | 'uz'
                              | 'zh'
                            )[]
                          | undefined
                        ruleContexts?: string[] | undefined
                        personalizationImpact?: number | undefined
                        userToken?: string | undefined
                        getRankingInfo?: boolean | undefined
                        synonyms?: boolean | undefined
                        clickAnalytics?: boolean | undefined
                        analytics?: boolean | undefined
                        analyticsTags?: string[] | undefined
                        percentileComputation?: boolean | undefined
                        enableABTest?: boolean | undefined
                        attributesToRetrieve?: string[] | undefined
                        ranking?: string[] | undefined
                        relevancyStrictness?: number | undefined
                        attributesToHighlight?: string[] | undefined
                        attributesToSnippet?: string[] | undefined
                        highlightPreTag?: string | undefined
                        highlightPostTag?: string | undefined
                        snippetEllipsisText?: string | undefined
                        restrictHighlightAndSnippetArrays?: boolean | undefined
                        hitsPerPage?: number | undefined
                        minWordSizefor1Typo?: number | undefined
                        minWordSizefor2Typos?: number | undefined
                        typoTolerance?: boolean | 'min' | 'strict' | 'true' | 'false' | undefined
                        allowTyposOnNumericTokens?: boolean | undefined
                        disableTypoToleranceOnAttributes?: string[] | undefined
                        ignorePlurals?:
                          | (
                              | 'af'
                              | 'ar'
                              | 'az'
                              | 'bg'
                              | 'bn'
                              | 'ca'
                              | 'cs'
                              | 'cy'
                              | 'da'
                              | 'de'
                              | 'el'
                              | 'en'
                              | 'eo'
                              | 'es'
                              | 'et'
                              | 'eu'
                              | 'fa'
                              | 'fi'
                              | 'fo'
                              | 'fr'
                              | 'ga'
                              | 'gl'
                              | 'he'
                              | 'hi'
                              | 'hu'
                              | 'hy'
                              | 'id'
                              | 'is'
                              | 'it'
                              | 'ja'
                              | 'ka'
                              | 'kk'
                              | 'ko'
                              | 'ku'
                              | 'ky'
                              | 'lt'
                              | 'lv'
                              | 'mi'
                              | 'mn'
                              | 'mr'
                              | 'ms'
                              | 'mt'
                              | 'nb'
                              | 'nl'
                              | 'no'
                              | 'ns'
                              | 'pl'
                              | 'ps'
                              | 'pt'
                              | 'pt-br'
                              | 'qu'
                              | 'ro'
                              | 'ru'
                              | 'sk'
                              | 'sq'
                              | 'sv'
                              | 'sw'
                              | 'ta'
                              | 'te'
                              | 'th'
                              | 'tl'
                              | 'tn'
                              | 'tr'
                              | 'tt'
                              | 'uk'
                              | 'ur'
                              | 'uz'
                              | 'zh'
                            )[]
                          | 'true'
                          | 'false'
                          | boolean
                          | undefined
                        removeStopWords?:
                          | (
                              | 'af'
                              | 'ar'
                              | 'az'
                              | 'bg'
                              | 'bn'
                              | 'ca'
                              | 'cs'
                              | 'cy'
                              | 'da'
                              | 'de'
                              | 'el'
                              | 'en'
                              | 'eo'
                              | 'es'
                              | 'et'
                              | 'eu'
                              | 'fa'
                              | 'fi'
                              | 'fo'
                              | 'fr'
                              | 'ga'
                              | 'gl'
                              | 'he'
                              | 'hi'
                              | 'hu'
                              | 'hy'
                              | 'id'
                              | 'is'
                              | 'it'
                              | 'ja'
                              | 'ka'
                              | 'kk'
                              | 'ko'
                              | 'ku'
                              | 'ky'
                              | 'lt'
                              | 'lv'
                              | 'mi'
                              | 'mn'
                              | 'mr'
                              | 'ms'
                              | 'mt'
                              | 'nb'
                              | 'nl'
                              | 'no'
                              | 'ns'
                              | 'pl'
                              | 'ps'
                              | 'pt'
                              | 'pt-br'
                              | 'qu'
                              | 'ro'
                              | 'ru'
                              | 'sk'
                              | 'sq'
                              | 'sv'
                              | 'sw'
                              | 'ta'
                              | 'te'
                              | 'th'
                              | 'tl'
                              | 'tn'
                              | 'tr'
                              | 'tt'
                              | 'uk'
                              | 'ur'
                              | 'uz'
                              | 'zh'
                            )[]
                          | boolean
                          | undefined
                        queryLanguages?:
                          | (
                              | 'af'
                              | 'ar'
                              | 'az'
                              | 'bg'
                              | 'bn'
                              | 'ca'
                              | 'cs'
                              | 'cy'
                              | 'da'
                              | 'de'
                              | 'el'
                              | 'en'
                              | 'eo'
                              | 'es'
                              | 'et'
                              | 'eu'
                              | 'fa'
                              | 'fi'
                              | 'fo'
                              | 'fr'
                              | 'ga'
                              | 'gl'
                              | 'he'
                              | 'hi'
                              | 'hu'
                              | 'hy'
                              | 'id'
                              | 'is'
                              | 'it'
                              | 'ja'
                              | 'ka'
                              | 'kk'
                              | 'ko'
                              | 'ku'
                              | 'ky'
                              | 'lt'
                              | 'lv'
                              | 'mi'
                              | 'mn'
                              | 'mr'
                              | 'ms'
                              | 'mt'
                              | 'nb'
                              | 'nl'
                              | 'no'
                              | 'ns'
                              | 'pl'
                              | 'ps'
                              | 'pt'
                              | 'pt-br'
                              | 'qu'
                              | 'ro'
                              | 'ru'
                              | 'sk'
                              | 'sq'
                              | 'sv'
                              | 'sw'
                              | 'ta'
                              | 'te'
                              | 'th'
                              | 'tl'
                              | 'tn'
                              | 'tr'
                              | 'tt'
                              | 'uk'
                              | 'ur'
                              | 'uz'
                              | 'zh'
                            )[]
                          | undefined
                        decompoundQuery?: boolean | undefined
                        enableRules?: boolean | undefined
                        enablePersonalization?: boolean | undefined
                        queryType?: 'prefixLast' | 'prefixAll' | 'prefixNone' | undefined
                        removeWordsIfNoResults?:
                          | 'none'
                          | 'lastWords'
                          | 'firstWords'
                          | 'allOptional'
                          | undefined
                        mode?: 'neuralSearch' | 'keywordSearch' | undefined
                        semanticSearch?:
                          | {
                              eventSources?:
                                | string[]
                                | ({ [x: string]: unknown } | null)
                                | undefined
                            }
                          | undefined
                        advancedSyntax?: boolean | undefined
                        optionalWords?:
                          | string
                          | ({ [x: string]: unknown } | null)
                          | string[]
                          | undefined
                        disableExactOnAttributes?: string[] | undefined
                        exactOnSingleWordQuery?: 'attribute' | 'none' | 'word' | undefined
                        alternativesAsExact?:
                          | (
                              | 'ignorePlurals'
                              | 'singleWordSynonym'
                              | 'multiWordsSynonym'
                              | 'ignoreConjugations'
                            )[]
                          | undefined
                        advancedSyntaxFeatures?: ('exactPhrase' | 'excludeWords')[] | undefined
                        distinct?: boolean | number | undefined
                        replaceSynonymsInHighlight?: boolean | undefined
                        minProximity?: number | undefined
                        responseFields?: string[] | undefined
                        maxValuesPerFacet?: number | undefined
                        sortFacetValuesBy?: string | undefined
                        attributeCriteriaComputedByMinProximity?: boolean | undefined
                        renderingContent?:
                          | {
                              facetOrdering?:
                                | {
                                    facets?: { order?: string[] | undefined } | undefined
                                    values?:
                                      | {
                                          [x: string]: {
                                            order?: string[] | undefined
                                            sortRemainingBy?:
                                              | 'count'
                                              | 'alpha'
                                              | 'hidden'
                                              | undefined
                                            hide?: string[] | undefined
                                          }
                                        }
                                      | undefined
                                  }
                                | undefined
                              redirect?: { url?: string | undefined } | undefined
                              widgets?:
                                | {
                                    banners?:
                                      | {
                                          image?:
                                            | {
                                                urls?: { url?: string | undefined }[] | undefined
                                                title?: string | undefined
                                              }
                                            | undefined
                                          link?: { url?: string | undefined } | undefined
                                        }[]
                                      | undefined
                                  }
                                | undefined
                            }
                          | undefined
                        enableReRanking?: boolean | undefined
                        reRankingApplyFilter?:
                          | unknown[]
                          | string
                          | ({ [x: string]: unknown } | null)
                          | undefined
                        query?:
                          | {
                              remove?: string[] | undefined
                              edits?:
                                | {
                                    type?: 'remove' | 'replace' | undefined
                                    delete?: string | undefined
                                    insert?: string | undefined
                                  }[]
                                | undefined
                            }
                          | string
                          | undefined
                        automaticFacetFilters?:
                          | {
                              facet: string
                              score?: number | undefined
                              disjunctive?: boolean | undefined
                            }[]
                          | string[]
                          | undefined
                        automaticOptionalFacetFilters?:
                          | {
                              facet: string
                              score?: number | undefined
                              disjunctive?: boolean | undefined
                            }[]
                          | string[]
                          | undefined
                      }
                    | undefined
                  promote?:
                    | (
                        | { objectIDs: string[]; position: number }
                        | { objectID: string; position: number }
                      )[]
                    | undefined
                  filterPromotes?: boolean | undefined
                  hide?: { objectID: string }[] | undefined
                  userData?: { [x: string]: unknown } | undefined
                }
                description?: string | undefined
                enabled?: boolean | undefined
                validity?: { from?: bigint | undefined; until?: bigint | undefined }[] | undefined
                tags?: string[] | undefined
                scope?: string | undefined
              }[]
            }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 402
          }
        | {
            input: { param: { indexName: string } } & {
              query: {
                forwardToReplicas?: boolean | undefined
                clearExistingRules?: boolean | undefined
              }
            } & {
              json: {
                objectID: string
                conditions?:
                  | {
                      pattern?: string | undefined
                      anchoring?: 'is' | 'startsWith' | 'endsWith' | 'contains' | undefined
                      alternatives?: boolean | undefined
                      context?: string | undefined
                      filters?: string | undefined
                    }[]
                  | undefined
                consequence: {
                  params?:
                    | {
                        similarQuery?: string | undefined
                        filters?: string | undefined
                        facetFilters?: unknown[] | string | undefined
                        optionalFilters?: unknown[] | string | undefined
                        numericFilters?: unknown[] | string | undefined
                        tagFilters?: unknown[] | string | undefined
                        sumOrFiltersScores?: boolean | undefined
                        restrictSearchableAttributes?: string[] | undefined
                        facets?: string[] | undefined
                        facetingAfterDistinct?: boolean | undefined
                        page?: number | undefined
                        offset?: number | undefined
                        length?: number | undefined
                        aroundLatLng?: string | undefined
                        aroundLatLngViaIP?: boolean | undefined
                        aroundRadius?: number | 'all' | undefined
                        aroundPrecision?:
                          | number
                          | { from?: number | undefined; value?: number | undefined }[]
                          | undefined
                        minimumAroundRadius?: number | undefined
                        insideBoundingBox?:
                          | string
                          | ({ [x: string]: unknown } | null)
                          | number[][]
                          | undefined
                        insidePolygon?: number[][] | undefined
                        naturalLanguages?:
                          | (
                              | 'af'
                              | 'ar'
                              | 'az'
                              | 'bg'
                              | 'bn'
                              | 'ca'
                              | 'cs'
                              | 'cy'
                              | 'da'
                              | 'de'
                              | 'el'
                              | 'en'
                              | 'eo'
                              | 'es'
                              | 'et'
                              | 'eu'
                              | 'fa'
                              | 'fi'
                              | 'fo'
                              | 'fr'
                              | 'ga'
                              | 'gl'
                              | 'he'
                              | 'hi'
                              | 'hu'
                              | 'hy'
                              | 'id'
                              | 'is'
                              | 'it'
                              | 'ja'
                              | 'ka'
                              | 'kk'
                              | 'ko'
                              | 'ku'
                              | 'ky'
                              | 'lt'
                              | 'lv'
                              | 'mi'
                              | 'mn'
                              | 'mr'
                              | 'ms'
                              | 'mt'
                              | 'nb'
                              | 'nl'
                              | 'no'
                              | 'ns'
                              | 'pl'
                              | 'ps'
                              | 'pt'
                              | 'pt-br'
                              | 'qu'
                              | 'ro'
                              | 'ru'
                              | 'sk'
                              | 'sq'
                              | 'sv'
                              | 'sw'
                              | 'ta'
                              | 'te'
                              | 'th'
                              | 'tl'
                              | 'tn'
                              | 'tr'
                              | 'tt'
                              | 'uk'
                              | 'ur'
                              | 'uz'
                              | 'zh'
                            )[]
                          | undefined
                        ruleContexts?: string[] | undefined
                        personalizationImpact?: number | undefined
                        userToken?: string | undefined
                        getRankingInfo?: boolean | undefined
                        synonyms?: boolean | undefined
                        clickAnalytics?: boolean | undefined
                        analytics?: boolean | undefined
                        analyticsTags?: string[] | undefined
                        percentileComputation?: boolean | undefined
                        enableABTest?: boolean | undefined
                        attributesToRetrieve?: string[] | undefined
                        ranking?: string[] | undefined
                        relevancyStrictness?: number | undefined
                        attributesToHighlight?: string[] | undefined
                        attributesToSnippet?: string[] | undefined
                        highlightPreTag?: string | undefined
                        highlightPostTag?: string | undefined
                        snippetEllipsisText?: string | undefined
                        restrictHighlightAndSnippetArrays?: boolean | undefined
                        hitsPerPage?: number | undefined
                        minWordSizefor1Typo?: number | undefined
                        minWordSizefor2Typos?: number | undefined
                        typoTolerance?: boolean | 'min' | 'strict' | 'true' | 'false' | undefined
                        allowTyposOnNumericTokens?: boolean | undefined
                        disableTypoToleranceOnAttributes?: string[] | undefined
                        ignorePlurals?:
                          | (
                              | 'af'
                              | 'ar'
                              | 'az'
                              | 'bg'
                              | 'bn'
                              | 'ca'
                              | 'cs'
                              | 'cy'
                              | 'da'
                              | 'de'
                              | 'el'
                              | 'en'
                              | 'eo'
                              | 'es'
                              | 'et'
                              | 'eu'
                              | 'fa'
                              | 'fi'
                              | 'fo'
                              | 'fr'
                              | 'ga'
                              | 'gl'
                              | 'he'
                              | 'hi'
                              | 'hu'
                              | 'hy'
                              | 'id'
                              | 'is'
                              | 'it'
                              | 'ja'
                              | 'ka'
                              | 'kk'
                              | 'ko'
                              | 'ku'
                              | 'ky'
                              | 'lt'
                              | 'lv'
                              | 'mi'
                              | 'mn'
                              | 'mr'
                              | 'ms'
                              | 'mt'
                              | 'nb'
                              | 'nl'
                              | 'no'
                              | 'ns'
                              | 'pl'
                              | 'ps'
                              | 'pt'
                              | 'pt-br'
                              | 'qu'
                              | 'ro'
                              | 'ru'
                              | 'sk'
                              | 'sq'
                              | 'sv'
                              | 'sw'
                              | 'ta'
                              | 'te'
                              | 'th'
                              | 'tl'
                              | 'tn'
                              | 'tr'
                              | 'tt'
                              | 'uk'
                              | 'ur'
                              | 'uz'
                              | 'zh'
                            )[]
                          | 'true'
                          | 'false'
                          | boolean
                          | undefined
                        removeStopWords?:
                          | (
                              | 'af'
                              | 'ar'
                              | 'az'
                              | 'bg'
                              | 'bn'
                              | 'ca'
                              | 'cs'
                              | 'cy'
                              | 'da'
                              | 'de'
                              | 'el'
                              | 'en'
                              | 'eo'
                              | 'es'
                              | 'et'
                              | 'eu'
                              | 'fa'
                              | 'fi'
                              | 'fo'
                              | 'fr'
                              | 'ga'
                              | 'gl'
                              | 'he'
                              | 'hi'
                              | 'hu'
                              | 'hy'
                              | 'id'
                              | 'is'
                              | 'it'
                              | 'ja'
                              | 'ka'
                              | 'kk'
                              | 'ko'
                              | 'ku'
                              | 'ky'
                              | 'lt'
                              | 'lv'
                              | 'mi'
                              | 'mn'
                              | 'mr'
                              | 'ms'
                              | 'mt'
                              | 'nb'
                              | 'nl'
                              | 'no'
                              | 'ns'
                              | 'pl'
                              | 'ps'
                              | 'pt'
                              | 'pt-br'
                              | 'qu'
                              | 'ro'
                              | 'ru'
                              | 'sk'
                              | 'sq'
                              | 'sv'
                              | 'sw'
                              | 'ta'
                              | 'te'
                              | 'th'
                              | 'tl'
                              | 'tn'
                              | 'tr'
                              | 'tt'
                              | 'uk'
                              | 'ur'
                              | 'uz'
                              | 'zh'
                            )[]
                          | boolean
                          | undefined
                        queryLanguages?:
                          | (
                              | 'af'
                              | 'ar'
                              | 'az'
                              | 'bg'
                              | 'bn'
                              | 'ca'
                              | 'cs'
                              | 'cy'
                              | 'da'
                              | 'de'
                              | 'el'
                              | 'en'
                              | 'eo'
                              | 'es'
                              | 'et'
                              | 'eu'
                              | 'fa'
                              | 'fi'
                              | 'fo'
                              | 'fr'
                              | 'ga'
                              | 'gl'
                              | 'he'
                              | 'hi'
                              | 'hu'
                              | 'hy'
                              | 'id'
                              | 'is'
                              | 'it'
                              | 'ja'
                              | 'ka'
                              | 'kk'
                              | 'ko'
                              | 'ku'
                              | 'ky'
                              | 'lt'
                              | 'lv'
                              | 'mi'
                              | 'mn'
                              | 'mr'
                              | 'ms'
                              | 'mt'
                              | 'nb'
                              | 'nl'
                              | 'no'
                              | 'ns'
                              | 'pl'
                              | 'ps'
                              | 'pt'
                              | 'pt-br'
                              | 'qu'
                              | 'ro'
                              | 'ru'
                              | 'sk'
                              | 'sq'
                              | 'sv'
                              | 'sw'
                              | 'ta'
                              | 'te'
                              | 'th'
                              | 'tl'
                              | 'tn'
                              | 'tr'
                              | 'tt'
                              | 'uk'
                              | 'ur'
                              | 'uz'
                              | 'zh'
                            )[]
                          | undefined
                        decompoundQuery?: boolean | undefined
                        enableRules?: boolean | undefined
                        enablePersonalization?: boolean | undefined
                        queryType?: 'prefixLast' | 'prefixAll' | 'prefixNone' | undefined
                        removeWordsIfNoResults?:
                          | 'none'
                          | 'lastWords'
                          | 'firstWords'
                          | 'allOptional'
                          | undefined
                        mode?: 'neuralSearch' | 'keywordSearch' | undefined
                        semanticSearch?:
                          | {
                              eventSources?:
                                | string[]
                                | ({ [x: string]: unknown } | null)
                                | undefined
                            }
                          | undefined
                        advancedSyntax?: boolean | undefined
                        optionalWords?:
                          | string
                          | ({ [x: string]: unknown } | null)
                          | string[]
                          | undefined
                        disableExactOnAttributes?: string[] | undefined
                        exactOnSingleWordQuery?: 'attribute' | 'none' | 'word' | undefined
                        alternativesAsExact?:
                          | (
                              | 'ignorePlurals'
                              | 'singleWordSynonym'
                              | 'multiWordsSynonym'
                              | 'ignoreConjugations'
                            )[]
                          | undefined
                        advancedSyntaxFeatures?: ('exactPhrase' | 'excludeWords')[] | undefined
                        distinct?: boolean | number | undefined
                        replaceSynonymsInHighlight?: boolean | undefined
                        minProximity?: number | undefined
                        responseFields?: string[] | undefined
                        maxValuesPerFacet?: number | undefined
                        sortFacetValuesBy?: string | undefined
                        attributeCriteriaComputedByMinProximity?: boolean | undefined
                        renderingContent?:
                          | {
                              facetOrdering?:
                                | {
                                    facets?: { order?: string[] | undefined } | undefined
                                    values?:
                                      | {
                                          [x: string]: {
                                            order?: string[] | undefined
                                            sortRemainingBy?:
                                              | 'count'
                                              | 'alpha'
                                              | 'hidden'
                                              | undefined
                                            hide?: string[] | undefined
                                          }
                                        }
                                      | undefined
                                  }
                                | undefined
                              redirect?: { url?: string | undefined } | undefined
                              widgets?:
                                | {
                                    banners?:
                                      | {
                                          image?:
                                            | {
                                                urls?: { url?: string | undefined }[] | undefined
                                                title?: string | undefined
                                              }
                                            | undefined
                                          link?: { url?: string | undefined } | undefined
                                        }[]
                                      | undefined
                                  }
                                | undefined
                            }
                          | undefined
                        enableReRanking?: boolean | undefined
                        reRankingApplyFilter?:
                          | unknown[]
                          | string
                          | ({ [x: string]: unknown } | null)
                          | undefined
                        query?:
                          | {
                              remove?: string[] | undefined
                              edits?:
                                | {
                                    type?: 'remove' | 'replace' | undefined
                                    delete?: string | undefined
                                    insert?: string | undefined
                                  }[]
                                | undefined
                            }
                          | string
                          | undefined
                        automaticFacetFilters?:
                          | {
                              facet: string
                              score?: number | undefined
                              disjunctive?: boolean | undefined
                            }[]
                          | string[]
                          | undefined
                        automaticOptionalFacetFilters?:
                          | {
                              facet: string
                              score?: number | undefined
                              disjunctive?: boolean | undefined
                            }[]
                          | string[]
                          | undefined
                      }
                    | undefined
                  promote?:
                    | (
                        | { objectIDs: string[]; position: number }
                        | { objectID: string; position: number }
                      )[]
                    | undefined
                  filterPromotes?: boolean | undefined
                  hide?: { objectID: string }[] | undefined
                  userData?: { [x: string]: unknown } | undefined
                }
                description?: string | undefined
                enabled?: boolean | undefined
                validity?: { from?: bigint | undefined; until?: bigint | undefined }[] | undefined
                tags?: string[] | undefined
                scope?: string | undefined
              }[]
            }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 403
          }
        | {
            input: { param: { indexName: string } } & {
              query: {
                forwardToReplicas?: boolean | undefined
                clearExistingRules?: boolean | undefined
              }
            } & {
              json: {
                objectID: string
                conditions?:
                  | {
                      pattern?: string | undefined
                      anchoring?: 'is' | 'startsWith' | 'endsWith' | 'contains' | undefined
                      alternatives?: boolean | undefined
                      context?: string | undefined
                      filters?: string | undefined
                    }[]
                  | undefined
                consequence: {
                  params?:
                    | {
                        similarQuery?: string | undefined
                        filters?: string | undefined
                        facetFilters?: unknown[] | string | undefined
                        optionalFilters?: unknown[] | string | undefined
                        numericFilters?: unknown[] | string | undefined
                        tagFilters?: unknown[] | string | undefined
                        sumOrFiltersScores?: boolean | undefined
                        restrictSearchableAttributes?: string[] | undefined
                        facets?: string[] | undefined
                        facetingAfterDistinct?: boolean | undefined
                        page?: number | undefined
                        offset?: number | undefined
                        length?: number | undefined
                        aroundLatLng?: string | undefined
                        aroundLatLngViaIP?: boolean | undefined
                        aroundRadius?: number | 'all' | undefined
                        aroundPrecision?:
                          | number
                          | { from?: number | undefined; value?: number | undefined }[]
                          | undefined
                        minimumAroundRadius?: number | undefined
                        insideBoundingBox?:
                          | string
                          | ({ [x: string]: unknown } | null)
                          | number[][]
                          | undefined
                        insidePolygon?: number[][] | undefined
                        naturalLanguages?:
                          | (
                              | 'af'
                              | 'ar'
                              | 'az'
                              | 'bg'
                              | 'bn'
                              | 'ca'
                              | 'cs'
                              | 'cy'
                              | 'da'
                              | 'de'
                              | 'el'
                              | 'en'
                              | 'eo'
                              | 'es'
                              | 'et'
                              | 'eu'
                              | 'fa'
                              | 'fi'
                              | 'fo'
                              | 'fr'
                              | 'ga'
                              | 'gl'
                              | 'he'
                              | 'hi'
                              | 'hu'
                              | 'hy'
                              | 'id'
                              | 'is'
                              | 'it'
                              | 'ja'
                              | 'ka'
                              | 'kk'
                              | 'ko'
                              | 'ku'
                              | 'ky'
                              | 'lt'
                              | 'lv'
                              | 'mi'
                              | 'mn'
                              | 'mr'
                              | 'ms'
                              | 'mt'
                              | 'nb'
                              | 'nl'
                              | 'no'
                              | 'ns'
                              | 'pl'
                              | 'ps'
                              | 'pt'
                              | 'pt-br'
                              | 'qu'
                              | 'ro'
                              | 'ru'
                              | 'sk'
                              | 'sq'
                              | 'sv'
                              | 'sw'
                              | 'ta'
                              | 'te'
                              | 'th'
                              | 'tl'
                              | 'tn'
                              | 'tr'
                              | 'tt'
                              | 'uk'
                              | 'ur'
                              | 'uz'
                              | 'zh'
                            )[]
                          | undefined
                        ruleContexts?: string[] | undefined
                        personalizationImpact?: number | undefined
                        userToken?: string | undefined
                        getRankingInfo?: boolean | undefined
                        synonyms?: boolean | undefined
                        clickAnalytics?: boolean | undefined
                        analytics?: boolean | undefined
                        analyticsTags?: string[] | undefined
                        percentileComputation?: boolean | undefined
                        enableABTest?: boolean | undefined
                        attributesToRetrieve?: string[] | undefined
                        ranking?: string[] | undefined
                        relevancyStrictness?: number | undefined
                        attributesToHighlight?: string[] | undefined
                        attributesToSnippet?: string[] | undefined
                        highlightPreTag?: string | undefined
                        highlightPostTag?: string | undefined
                        snippetEllipsisText?: string | undefined
                        restrictHighlightAndSnippetArrays?: boolean | undefined
                        hitsPerPage?: number | undefined
                        minWordSizefor1Typo?: number | undefined
                        minWordSizefor2Typos?: number | undefined
                        typoTolerance?: boolean | 'min' | 'strict' | 'true' | 'false' | undefined
                        allowTyposOnNumericTokens?: boolean | undefined
                        disableTypoToleranceOnAttributes?: string[] | undefined
                        ignorePlurals?:
                          | (
                              | 'af'
                              | 'ar'
                              | 'az'
                              | 'bg'
                              | 'bn'
                              | 'ca'
                              | 'cs'
                              | 'cy'
                              | 'da'
                              | 'de'
                              | 'el'
                              | 'en'
                              | 'eo'
                              | 'es'
                              | 'et'
                              | 'eu'
                              | 'fa'
                              | 'fi'
                              | 'fo'
                              | 'fr'
                              | 'ga'
                              | 'gl'
                              | 'he'
                              | 'hi'
                              | 'hu'
                              | 'hy'
                              | 'id'
                              | 'is'
                              | 'it'
                              | 'ja'
                              | 'ka'
                              | 'kk'
                              | 'ko'
                              | 'ku'
                              | 'ky'
                              | 'lt'
                              | 'lv'
                              | 'mi'
                              | 'mn'
                              | 'mr'
                              | 'ms'
                              | 'mt'
                              | 'nb'
                              | 'nl'
                              | 'no'
                              | 'ns'
                              | 'pl'
                              | 'ps'
                              | 'pt'
                              | 'pt-br'
                              | 'qu'
                              | 'ro'
                              | 'ru'
                              | 'sk'
                              | 'sq'
                              | 'sv'
                              | 'sw'
                              | 'ta'
                              | 'te'
                              | 'th'
                              | 'tl'
                              | 'tn'
                              | 'tr'
                              | 'tt'
                              | 'uk'
                              | 'ur'
                              | 'uz'
                              | 'zh'
                            )[]
                          | 'true'
                          | 'false'
                          | boolean
                          | undefined
                        removeStopWords?:
                          | (
                              | 'af'
                              | 'ar'
                              | 'az'
                              | 'bg'
                              | 'bn'
                              | 'ca'
                              | 'cs'
                              | 'cy'
                              | 'da'
                              | 'de'
                              | 'el'
                              | 'en'
                              | 'eo'
                              | 'es'
                              | 'et'
                              | 'eu'
                              | 'fa'
                              | 'fi'
                              | 'fo'
                              | 'fr'
                              | 'ga'
                              | 'gl'
                              | 'he'
                              | 'hi'
                              | 'hu'
                              | 'hy'
                              | 'id'
                              | 'is'
                              | 'it'
                              | 'ja'
                              | 'ka'
                              | 'kk'
                              | 'ko'
                              | 'ku'
                              | 'ky'
                              | 'lt'
                              | 'lv'
                              | 'mi'
                              | 'mn'
                              | 'mr'
                              | 'ms'
                              | 'mt'
                              | 'nb'
                              | 'nl'
                              | 'no'
                              | 'ns'
                              | 'pl'
                              | 'ps'
                              | 'pt'
                              | 'pt-br'
                              | 'qu'
                              | 'ro'
                              | 'ru'
                              | 'sk'
                              | 'sq'
                              | 'sv'
                              | 'sw'
                              | 'ta'
                              | 'te'
                              | 'th'
                              | 'tl'
                              | 'tn'
                              | 'tr'
                              | 'tt'
                              | 'uk'
                              | 'ur'
                              | 'uz'
                              | 'zh'
                            )[]
                          | boolean
                          | undefined
                        queryLanguages?:
                          | (
                              | 'af'
                              | 'ar'
                              | 'az'
                              | 'bg'
                              | 'bn'
                              | 'ca'
                              | 'cs'
                              | 'cy'
                              | 'da'
                              | 'de'
                              | 'el'
                              | 'en'
                              | 'eo'
                              | 'es'
                              | 'et'
                              | 'eu'
                              | 'fa'
                              | 'fi'
                              | 'fo'
                              | 'fr'
                              | 'ga'
                              | 'gl'
                              | 'he'
                              | 'hi'
                              | 'hu'
                              | 'hy'
                              | 'id'
                              | 'is'
                              | 'it'
                              | 'ja'
                              | 'ka'
                              | 'kk'
                              | 'ko'
                              | 'ku'
                              | 'ky'
                              | 'lt'
                              | 'lv'
                              | 'mi'
                              | 'mn'
                              | 'mr'
                              | 'ms'
                              | 'mt'
                              | 'nb'
                              | 'nl'
                              | 'no'
                              | 'ns'
                              | 'pl'
                              | 'ps'
                              | 'pt'
                              | 'pt-br'
                              | 'qu'
                              | 'ro'
                              | 'ru'
                              | 'sk'
                              | 'sq'
                              | 'sv'
                              | 'sw'
                              | 'ta'
                              | 'te'
                              | 'th'
                              | 'tl'
                              | 'tn'
                              | 'tr'
                              | 'tt'
                              | 'uk'
                              | 'ur'
                              | 'uz'
                              | 'zh'
                            )[]
                          | undefined
                        decompoundQuery?: boolean | undefined
                        enableRules?: boolean | undefined
                        enablePersonalization?: boolean | undefined
                        queryType?: 'prefixLast' | 'prefixAll' | 'prefixNone' | undefined
                        removeWordsIfNoResults?:
                          | 'none'
                          | 'lastWords'
                          | 'firstWords'
                          | 'allOptional'
                          | undefined
                        mode?: 'neuralSearch' | 'keywordSearch' | undefined
                        semanticSearch?:
                          | {
                              eventSources?:
                                | string[]
                                | ({ [x: string]: unknown } | null)
                                | undefined
                            }
                          | undefined
                        advancedSyntax?: boolean | undefined
                        optionalWords?:
                          | string
                          | ({ [x: string]: unknown } | null)
                          | string[]
                          | undefined
                        disableExactOnAttributes?: string[] | undefined
                        exactOnSingleWordQuery?: 'attribute' | 'none' | 'word' | undefined
                        alternativesAsExact?:
                          | (
                              | 'ignorePlurals'
                              | 'singleWordSynonym'
                              | 'multiWordsSynonym'
                              | 'ignoreConjugations'
                            )[]
                          | undefined
                        advancedSyntaxFeatures?: ('exactPhrase' | 'excludeWords')[] | undefined
                        distinct?: boolean | number | undefined
                        replaceSynonymsInHighlight?: boolean | undefined
                        minProximity?: number | undefined
                        responseFields?: string[] | undefined
                        maxValuesPerFacet?: number | undefined
                        sortFacetValuesBy?: string | undefined
                        attributeCriteriaComputedByMinProximity?: boolean | undefined
                        renderingContent?:
                          | {
                              facetOrdering?:
                                | {
                                    facets?: { order?: string[] | undefined } | undefined
                                    values?:
                                      | {
                                          [x: string]: {
                                            order?: string[] | undefined
                                            sortRemainingBy?:
                                              | 'count'
                                              | 'alpha'
                                              | 'hidden'
                                              | undefined
                                            hide?: string[] | undefined
                                          }
                                        }
                                      | undefined
                                  }
                                | undefined
                              redirect?: { url?: string | undefined } | undefined
                              widgets?:
                                | {
                                    banners?:
                                      | {
                                          image?:
                                            | {
                                                urls?: { url?: string | undefined }[] | undefined
                                                title?: string | undefined
                                              }
                                            | undefined
                                          link?: { url?: string | undefined } | undefined
                                        }[]
                                      | undefined
                                  }
                                | undefined
                            }
                          | undefined
                        enableReRanking?: boolean | undefined
                        reRankingApplyFilter?:
                          | unknown[]
                          | string
                          | ({ [x: string]: unknown } | null)
                          | undefined
                        query?:
                          | {
                              remove?: string[] | undefined
                              edits?:
                                | {
                                    type?: 'remove' | 'replace' | undefined
                                    delete?: string | undefined
                                    insert?: string | undefined
                                  }[]
                                | undefined
                            }
                          | string
                          | undefined
                        automaticFacetFilters?:
                          | {
                              facet: string
                              score?: number | undefined
                              disjunctive?: boolean | undefined
                            }[]
                          | string[]
                          | undefined
                        automaticOptionalFacetFilters?:
                          | {
                              facet: string
                              score?: number | undefined
                              disjunctive?: boolean | undefined
                            }[]
                          | string[]
                          | undefined
                      }
                    | undefined
                  promote?:
                    | (
                        | { objectIDs: string[]; position: number }
                        | { objectID: string; position: number }
                      )[]
                    | undefined
                  filterPromotes?: boolean | undefined
                  hide?: { objectID: string }[] | undefined
                  userData?: { [x: string]: unknown } | undefined
                }
                description?: string | undefined
                enabled?: boolean | undefined
                validity?: { from?: bigint | undefined; until?: bigint | undefined }[] | undefined
                tags?: string[] | undefined
                scope?: string | undefined
              }[]
            }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 404
          }
    }
  } & {
    '/1/indexes/:indexName/rules/clear': {
      $post:
        | {
            input: { param: { indexName: string } } & {
              query: { forwardToReplicas?: boolean | undefined }
            }
            output: { taskID: bigint; updatedAt: string }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { param: { indexName: string } } & {
              query: { forwardToReplicas?: boolean | undefined }
            }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 400
          }
        | {
            input: { param: { indexName: string } } & {
              query: { forwardToReplicas?: boolean | undefined }
            }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 402
          }
        | {
            input: { param: { indexName: string } } & {
              query: { forwardToReplicas?: boolean | undefined }
            }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 403
          }
        | {
            input: { param: { indexName: string } } & {
              query: { forwardToReplicas?: boolean | undefined }
            }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 404
          }
    }
  } & {
    '/1/indexes/:indexName/rules/search': {
      $post:
        | {
            input: { param: { indexName: string } } & {
              json: {
                query?: string | undefined
                anchoring?: 'is' | 'startsWith' | 'endsWith' | 'contains' | undefined
                context?: string | undefined
                page?: number | undefined
                hitsPerPage?: number | undefined
                enabled?: boolean | ({ [x: string]: unknown } | null) | undefined
              }
            }
            output: {
              hits: {
                objectID: string
                conditions?:
                  | {
                      pattern?: string | undefined
                      anchoring?: 'is' | 'startsWith' | 'endsWith' | 'contains' | undefined
                      alternatives?: boolean | undefined
                      context?: string | undefined
                      filters?: string | undefined
                    }[]
                  | undefined
                consequence: {
                  params?:
                    | {
                        similarQuery?: string | undefined
                        filters?: string | undefined
                        facetFilters?: unknown[] | string | undefined
                        optionalFilters?: unknown[] | string | undefined
                        numericFilters?: unknown[] | string | undefined
                        tagFilters?: unknown[] | string | undefined
                        sumOrFiltersScores?: boolean | undefined
                        restrictSearchableAttributes?: string[] | undefined
                        facets?: string[] | undefined
                        facetingAfterDistinct?: boolean | undefined
                        page?: number | undefined
                        offset?: number | undefined
                        length?: number | undefined
                        aroundLatLng?: string | undefined
                        aroundLatLngViaIP?: boolean | undefined
                        aroundRadius?: number | 'all' | undefined
                        aroundPrecision?:
                          | number
                          | { from?: number | undefined; value?: number | undefined }[]
                          | undefined
                        minimumAroundRadius?: number | undefined
                        insideBoundingBox?:
                          | string
                          | ({ [x: string]: unknown } | null)
                          | number[][]
                          | undefined
                        insidePolygon?: number[][] | undefined
                        naturalLanguages?:
                          | (
                              | 'af'
                              | 'ar'
                              | 'az'
                              | 'bg'
                              | 'bn'
                              | 'ca'
                              | 'cs'
                              | 'cy'
                              | 'da'
                              | 'de'
                              | 'el'
                              | 'en'
                              | 'eo'
                              | 'es'
                              | 'et'
                              | 'eu'
                              | 'fa'
                              | 'fi'
                              | 'fo'
                              | 'fr'
                              | 'ga'
                              | 'gl'
                              | 'he'
                              | 'hi'
                              | 'hu'
                              | 'hy'
                              | 'id'
                              | 'is'
                              | 'it'
                              | 'ja'
                              | 'ka'
                              | 'kk'
                              | 'ko'
                              | 'ku'
                              | 'ky'
                              | 'lt'
                              | 'lv'
                              | 'mi'
                              | 'mn'
                              | 'mr'
                              | 'ms'
                              | 'mt'
                              | 'nb'
                              | 'nl'
                              | 'no'
                              | 'ns'
                              | 'pl'
                              | 'ps'
                              | 'pt'
                              | 'pt-br'
                              | 'qu'
                              | 'ro'
                              | 'ru'
                              | 'sk'
                              | 'sq'
                              | 'sv'
                              | 'sw'
                              | 'ta'
                              | 'te'
                              | 'th'
                              | 'tl'
                              | 'tn'
                              | 'tr'
                              | 'tt'
                              | 'uk'
                              | 'ur'
                              | 'uz'
                              | 'zh'
                            )[]
                          | undefined
                        ruleContexts?: string[] | undefined
                        personalizationImpact?: number | undefined
                        userToken?: string | undefined
                        getRankingInfo?: boolean | undefined
                        synonyms?: boolean | undefined
                        clickAnalytics?: boolean | undefined
                        analytics?: boolean | undefined
                        analyticsTags?: string[] | undefined
                        percentileComputation?: boolean | undefined
                        enableABTest?: boolean | undefined
                        attributesToRetrieve?: string[] | undefined
                        ranking?: string[] | undefined
                        relevancyStrictness?: number | undefined
                        attributesToHighlight?: string[] | undefined
                        attributesToSnippet?: string[] | undefined
                        highlightPreTag?: string | undefined
                        highlightPostTag?: string | undefined
                        snippetEllipsisText?: string | undefined
                        restrictHighlightAndSnippetArrays?: boolean | undefined
                        hitsPerPage?: number | undefined
                        minWordSizefor1Typo?: number | undefined
                        minWordSizefor2Typos?: number | undefined
                        typoTolerance?: boolean | 'min' | 'strict' | 'true' | 'false' | undefined
                        allowTyposOnNumericTokens?: boolean | undefined
                        disableTypoToleranceOnAttributes?: string[] | undefined
                        ignorePlurals?:
                          | (
                              | 'af'
                              | 'ar'
                              | 'az'
                              | 'bg'
                              | 'bn'
                              | 'ca'
                              | 'cs'
                              | 'cy'
                              | 'da'
                              | 'de'
                              | 'el'
                              | 'en'
                              | 'eo'
                              | 'es'
                              | 'et'
                              | 'eu'
                              | 'fa'
                              | 'fi'
                              | 'fo'
                              | 'fr'
                              | 'ga'
                              | 'gl'
                              | 'he'
                              | 'hi'
                              | 'hu'
                              | 'hy'
                              | 'id'
                              | 'is'
                              | 'it'
                              | 'ja'
                              | 'ka'
                              | 'kk'
                              | 'ko'
                              | 'ku'
                              | 'ky'
                              | 'lt'
                              | 'lv'
                              | 'mi'
                              | 'mn'
                              | 'mr'
                              | 'ms'
                              | 'mt'
                              | 'nb'
                              | 'nl'
                              | 'no'
                              | 'ns'
                              | 'pl'
                              | 'ps'
                              | 'pt'
                              | 'pt-br'
                              | 'qu'
                              | 'ro'
                              | 'ru'
                              | 'sk'
                              | 'sq'
                              | 'sv'
                              | 'sw'
                              | 'ta'
                              | 'te'
                              | 'th'
                              | 'tl'
                              | 'tn'
                              | 'tr'
                              | 'tt'
                              | 'uk'
                              | 'ur'
                              | 'uz'
                              | 'zh'
                            )[]
                          | 'true'
                          | 'false'
                          | boolean
                          | undefined
                        removeStopWords?:
                          | (
                              | 'af'
                              | 'ar'
                              | 'az'
                              | 'bg'
                              | 'bn'
                              | 'ca'
                              | 'cs'
                              | 'cy'
                              | 'da'
                              | 'de'
                              | 'el'
                              | 'en'
                              | 'eo'
                              | 'es'
                              | 'et'
                              | 'eu'
                              | 'fa'
                              | 'fi'
                              | 'fo'
                              | 'fr'
                              | 'ga'
                              | 'gl'
                              | 'he'
                              | 'hi'
                              | 'hu'
                              | 'hy'
                              | 'id'
                              | 'is'
                              | 'it'
                              | 'ja'
                              | 'ka'
                              | 'kk'
                              | 'ko'
                              | 'ku'
                              | 'ky'
                              | 'lt'
                              | 'lv'
                              | 'mi'
                              | 'mn'
                              | 'mr'
                              | 'ms'
                              | 'mt'
                              | 'nb'
                              | 'nl'
                              | 'no'
                              | 'ns'
                              | 'pl'
                              | 'ps'
                              | 'pt'
                              | 'pt-br'
                              | 'qu'
                              | 'ro'
                              | 'ru'
                              | 'sk'
                              | 'sq'
                              | 'sv'
                              | 'sw'
                              | 'ta'
                              | 'te'
                              | 'th'
                              | 'tl'
                              | 'tn'
                              | 'tr'
                              | 'tt'
                              | 'uk'
                              | 'ur'
                              | 'uz'
                              | 'zh'
                            )[]
                          | boolean
                          | undefined
                        queryLanguages?:
                          | (
                              | 'af'
                              | 'ar'
                              | 'az'
                              | 'bg'
                              | 'bn'
                              | 'ca'
                              | 'cs'
                              | 'cy'
                              | 'da'
                              | 'de'
                              | 'el'
                              | 'en'
                              | 'eo'
                              | 'es'
                              | 'et'
                              | 'eu'
                              | 'fa'
                              | 'fi'
                              | 'fo'
                              | 'fr'
                              | 'ga'
                              | 'gl'
                              | 'he'
                              | 'hi'
                              | 'hu'
                              | 'hy'
                              | 'id'
                              | 'is'
                              | 'it'
                              | 'ja'
                              | 'ka'
                              | 'kk'
                              | 'ko'
                              | 'ku'
                              | 'ky'
                              | 'lt'
                              | 'lv'
                              | 'mi'
                              | 'mn'
                              | 'mr'
                              | 'ms'
                              | 'mt'
                              | 'nb'
                              | 'nl'
                              | 'no'
                              | 'ns'
                              | 'pl'
                              | 'ps'
                              | 'pt'
                              | 'pt-br'
                              | 'qu'
                              | 'ro'
                              | 'ru'
                              | 'sk'
                              | 'sq'
                              | 'sv'
                              | 'sw'
                              | 'ta'
                              | 'te'
                              | 'th'
                              | 'tl'
                              | 'tn'
                              | 'tr'
                              | 'tt'
                              | 'uk'
                              | 'ur'
                              | 'uz'
                              | 'zh'
                            )[]
                          | undefined
                        decompoundQuery?: boolean | undefined
                        enableRules?: boolean | undefined
                        enablePersonalization?: boolean | undefined
                        queryType?: 'prefixLast' | 'prefixAll' | 'prefixNone' | undefined
                        removeWordsIfNoResults?:
                          | 'none'
                          | 'lastWords'
                          | 'firstWords'
                          | 'allOptional'
                          | undefined
                        mode?: 'neuralSearch' | 'keywordSearch' | undefined
                        semanticSearch?:
                          | {
                              eventSources?:
                                | string[]
                                | ({ [x: string]: unknown } | null)
                                | undefined
                            }
                          | undefined
                        advancedSyntax?: boolean | undefined
                        optionalWords?:
                          | string
                          | ({ [x: string]: unknown } | null)
                          | string[]
                          | undefined
                        disableExactOnAttributes?: string[] | undefined
                        exactOnSingleWordQuery?: 'attribute' | 'none' | 'word' | undefined
                        alternativesAsExact?:
                          | (
                              | 'ignorePlurals'
                              | 'singleWordSynonym'
                              | 'multiWordsSynonym'
                              | 'ignoreConjugations'
                            )[]
                          | undefined
                        advancedSyntaxFeatures?: ('exactPhrase' | 'excludeWords')[] | undefined
                        distinct?: boolean | number | undefined
                        replaceSynonymsInHighlight?: boolean | undefined
                        minProximity?: number | undefined
                        responseFields?: string[] | undefined
                        maxValuesPerFacet?: number | undefined
                        sortFacetValuesBy?: string | undefined
                        attributeCriteriaComputedByMinProximity?: boolean | undefined
                        renderingContent?:
                          | {
                              facetOrdering?:
                                | {
                                    facets?: { order?: string[] | undefined } | undefined
                                    values?:
                                      | {
                                          [x: string]: {
                                            order?: string[] | undefined
                                            sortRemainingBy?:
                                              | 'count'
                                              | 'alpha'
                                              | 'hidden'
                                              | undefined
                                            hide?: string[] | undefined
                                          }
                                        }
                                      | undefined
                                  }
                                | undefined
                              redirect?: { url?: string | undefined } | undefined
                              widgets?:
                                | {
                                    banners?:
                                      | {
                                          image?:
                                            | {
                                                urls?: { url?: string | undefined }[] | undefined
                                                title?: string | undefined
                                              }
                                            | undefined
                                          link?: { url?: string | undefined } | undefined
                                        }[]
                                      | undefined
                                  }
                                | undefined
                            }
                          | undefined
                        enableReRanking?: boolean | undefined
                        reRankingApplyFilter?:
                          | unknown[]
                          | string
                          | ({ [x: string]: unknown } | null)
                          | undefined
                        query?:
                          | {
                              remove?: string[] | undefined
                              edits?:
                                | {
                                    type?: 'remove' | 'replace' | undefined
                                    delete?: string | undefined
                                    insert?: string | undefined
                                  }[]
                                | undefined
                            }
                          | string
                          | undefined
                        automaticFacetFilters?:
                          | {
                              facet: string
                              score?: number | undefined
                              disjunctive?: boolean | undefined
                            }[]
                          | string[]
                          | undefined
                        automaticOptionalFacetFilters?:
                          | {
                              facet: string
                              score?: number | undefined
                              disjunctive?: boolean | undefined
                            }[]
                          | string[]
                          | undefined
                      }
                    | undefined
                  promote?:
                    | (
                        | { objectIDs: string[]; position: number }
                        | { objectID: string; position: number }
                      )[]
                    | undefined
                  filterPromotes?: boolean | undefined
                  hide?: { objectID: string }[] | undefined
                  userData?: { [x: string]: unknown } | undefined
                }
                description?: string | undefined
                enabled?: boolean | undefined
                validity?: { from?: bigint | undefined; until?: bigint | undefined }[] | undefined
                tags?: string[] | undefined
                scope?: string | undefined
              }[]
              nbHits: number
              page: number
              nbPages: number
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { param: { indexName: string } } & {
              json: {
                query?: string | undefined
                anchoring?: 'is' | 'startsWith' | 'endsWith' | 'contains' | undefined
                context?: string | undefined
                page?: number | undefined
                hitsPerPage?: number | undefined
                enabled?: boolean | ({ [x: string]: unknown } | null) | undefined
              }
            }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 400
          }
        | {
            input: { param: { indexName: string } } & {
              json: {
                query?: string | undefined
                anchoring?: 'is' | 'startsWith' | 'endsWith' | 'contains' | undefined
                context?: string | undefined
                page?: number | undefined
                hitsPerPage?: number | undefined
                enabled?: boolean | ({ [x: string]: unknown } | null) | undefined
              }
            }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 402
          }
        | {
            input: { param: { indexName: string } } & {
              json: {
                query?: string | undefined
                anchoring?: 'is' | 'startsWith' | 'endsWith' | 'contains' | undefined
                context?: string | undefined
                page?: number | undefined
                hitsPerPage?: number | undefined
                enabled?: boolean | ({ [x: string]: unknown } | null) | undefined
              }
            }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 403
          }
        | {
            input: { param: { indexName: string } } & {
              json: {
                query?: string | undefined
                anchoring?: 'is' | 'startsWith' | 'endsWith' | 'contains' | undefined
                context?: string | undefined
                page?: number | undefined
                hitsPerPage?: number | undefined
                enabled?: boolean | ({ [x: string]: unknown } | null) | undefined
              }
            }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 404
          }
    }
  } & {
    '/1/dictionaries/:dictionaryName/batch': {
      $post:
        | {
            input: { param: { dictionaryName: 'plurals' | 'stopwords' | 'compounds' } } & {
              json: {
                clearExistingDictionaryEntries?: boolean | undefined
                requests: {
                  action: 'addEntry' | 'deleteEntry'
                  body: {
                    objectID: string
                    language?:
                      | 'af'
                      | 'ar'
                      | 'az'
                      | 'bg'
                      | 'bn'
                      | 'ca'
                      | 'cs'
                      | 'cy'
                      | 'da'
                      | 'de'
                      | 'el'
                      | 'en'
                      | 'eo'
                      | 'es'
                      | 'et'
                      | 'eu'
                      | 'fa'
                      | 'fi'
                      | 'fo'
                      | 'fr'
                      | 'ga'
                      | 'gl'
                      | 'he'
                      | 'hi'
                      | 'hu'
                      | 'hy'
                      | 'id'
                      | 'is'
                      | 'it'
                      | 'ja'
                      | 'ka'
                      | 'kk'
                      | 'ko'
                      | 'ku'
                      | 'ky'
                      | 'lt'
                      | 'lv'
                      | 'mi'
                      | 'mn'
                      | 'mr'
                      | 'ms'
                      | 'mt'
                      | 'nb'
                      | 'nl'
                      | 'no'
                      | 'ns'
                      | 'pl'
                      | 'ps'
                      | 'pt'
                      | 'pt-br'
                      | 'qu'
                      | 'ro'
                      | 'ru'
                      | 'sk'
                      | 'sq'
                      | 'sv'
                      | 'sw'
                      | 'ta'
                      | 'te'
                      | 'th'
                      | 'tl'
                      | 'tn'
                      | 'tr'
                      | 'tt'
                      | 'uk'
                      | 'ur'
                      | 'uz'
                      | 'zh'
                      | undefined
                    word?: string | undefined
                    words?: string[] | undefined
                    decomposition?: string[] | undefined
                    state?: 'enabled' | 'disabled' | undefined
                    type?: 'custom' | 'standard' | undefined
                  }
                }[]
              }
            }
            output: { taskID: bigint; updatedAt: string }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { param: { dictionaryName: 'plurals' | 'stopwords' | 'compounds' } } & {
              json: {
                clearExistingDictionaryEntries?: boolean | undefined
                requests: {
                  action: 'addEntry' | 'deleteEntry'
                  body: {
                    objectID: string
                    language?:
                      | 'af'
                      | 'ar'
                      | 'az'
                      | 'bg'
                      | 'bn'
                      | 'ca'
                      | 'cs'
                      | 'cy'
                      | 'da'
                      | 'de'
                      | 'el'
                      | 'en'
                      | 'eo'
                      | 'es'
                      | 'et'
                      | 'eu'
                      | 'fa'
                      | 'fi'
                      | 'fo'
                      | 'fr'
                      | 'ga'
                      | 'gl'
                      | 'he'
                      | 'hi'
                      | 'hu'
                      | 'hy'
                      | 'id'
                      | 'is'
                      | 'it'
                      | 'ja'
                      | 'ka'
                      | 'kk'
                      | 'ko'
                      | 'ku'
                      | 'ky'
                      | 'lt'
                      | 'lv'
                      | 'mi'
                      | 'mn'
                      | 'mr'
                      | 'ms'
                      | 'mt'
                      | 'nb'
                      | 'nl'
                      | 'no'
                      | 'ns'
                      | 'pl'
                      | 'ps'
                      | 'pt'
                      | 'pt-br'
                      | 'qu'
                      | 'ro'
                      | 'ru'
                      | 'sk'
                      | 'sq'
                      | 'sv'
                      | 'sw'
                      | 'ta'
                      | 'te'
                      | 'th'
                      | 'tl'
                      | 'tn'
                      | 'tr'
                      | 'tt'
                      | 'uk'
                      | 'ur'
                      | 'uz'
                      | 'zh'
                      | undefined
                    word?: string | undefined
                    words?: string[] | undefined
                    decomposition?: string[] | undefined
                    state?: 'enabled' | 'disabled' | undefined
                    type?: 'custom' | 'standard' | undefined
                  }
                }[]
              }
            }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 400
          }
        | {
            input: { param: { dictionaryName: 'plurals' | 'stopwords' | 'compounds' } } & {
              json: {
                clearExistingDictionaryEntries?: boolean | undefined
                requests: {
                  action: 'addEntry' | 'deleteEntry'
                  body: {
                    objectID: string
                    language?:
                      | 'af'
                      | 'ar'
                      | 'az'
                      | 'bg'
                      | 'bn'
                      | 'ca'
                      | 'cs'
                      | 'cy'
                      | 'da'
                      | 'de'
                      | 'el'
                      | 'en'
                      | 'eo'
                      | 'es'
                      | 'et'
                      | 'eu'
                      | 'fa'
                      | 'fi'
                      | 'fo'
                      | 'fr'
                      | 'ga'
                      | 'gl'
                      | 'he'
                      | 'hi'
                      | 'hu'
                      | 'hy'
                      | 'id'
                      | 'is'
                      | 'it'
                      | 'ja'
                      | 'ka'
                      | 'kk'
                      | 'ko'
                      | 'ku'
                      | 'ky'
                      | 'lt'
                      | 'lv'
                      | 'mi'
                      | 'mn'
                      | 'mr'
                      | 'ms'
                      | 'mt'
                      | 'nb'
                      | 'nl'
                      | 'no'
                      | 'ns'
                      | 'pl'
                      | 'ps'
                      | 'pt'
                      | 'pt-br'
                      | 'qu'
                      | 'ro'
                      | 'ru'
                      | 'sk'
                      | 'sq'
                      | 'sv'
                      | 'sw'
                      | 'ta'
                      | 'te'
                      | 'th'
                      | 'tl'
                      | 'tn'
                      | 'tr'
                      | 'tt'
                      | 'uk'
                      | 'ur'
                      | 'uz'
                      | 'zh'
                      | undefined
                    word?: string | undefined
                    words?: string[] | undefined
                    decomposition?: string[] | undefined
                    state?: 'enabled' | 'disabled' | undefined
                    type?: 'custom' | 'standard' | undefined
                  }
                }[]
              }
            }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 402
          }
        | {
            input: { param: { dictionaryName: 'plurals' | 'stopwords' | 'compounds' } } & {
              json: {
                clearExistingDictionaryEntries?: boolean | undefined
                requests: {
                  action: 'addEntry' | 'deleteEntry'
                  body: {
                    objectID: string
                    language?:
                      | 'af'
                      | 'ar'
                      | 'az'
                      | 'bg'
                      | 'bn'
                      | 'ca'
                      | 'cs'
                      | 'cy'
                      | 'da'
                      | 'de'
                      | 'el'
                      | 'en'
                      | 'eo'
                      | 'es'
                      | 'et'
                      | 'eu'
                      | 'fa'
                      | 'fi'
                      | 'fo'
                      | 'fr'
                      | 'ga'
                      | 'gl'
                      | 'he'
                      | 'hi'
                      | 'hu'
                      | 'hy'
                      | 'id'
                      | 'is'
                      | 'it'
                      | 'ja'
                      | 'ka'
                      | 'kk'
                      | 'ko'
                      | 'ku'
                      | 'ky'
                      | 'lt'
                      | 'lv'
                      | 'mi'
                      | 'mn'
                      | 'mr'
                      | 'ms'
                      | 'mt'
                      | 'nb'
                      | 'nl'
                      | 'no'
                      | 'ns'
                      | 'pl'
                      | 'ps'
                      | 'pt'
                      | 'pt-br'
                      | 'qu'
                      | 'ro'
                      | 'ru'
                      | 'sk'
                      | 'sq'
                      | 'sv'
                      | 'sw'
                      | 'ta'
                      | 'te'
                      | 'th'
                      | 'tl'
                      | 'tn'
                      | 'tr'
                      | 'tt'
                      | 'uk'
                      | 'ur'
                      | 'uz'
                      | 'zh'
                      | undefined
                    word?: string | undefined
                    words?: string[] | undefined
                    decomposition?: string[] | undefined
                    state?: 'enabled' | 'disabled' | undefined
                    type?: 'custom' | 'standard' | undefined
                  }
                }[]
              }
            }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 403
          }
        | {
            input: { param: { dictionaryName: 'plurals' | 'stopwords' | 'compounds' } } & {
              json: {
                clearExistingDictionaryEntries?: boolean | undefined
                requests: {
                  action: 'addEntry' | 'deleteEntry'
                  body: {
                    objectID: string
                    language?:
                      | 'af'
                      | 'ar'
                      | 'az'
                      | 'bg'
                      | 'bn'
                      | 'ca'
                      | 'cs'
                      | 'cy'
                      | 'da'
                      | 'de'
                      | 'el'
                      | 'en'
                      | 'eo'
                      | 'es'
                      | 'et'
                      | 'eu'
                      | 'fa'
                      | 'fi'
                      | 'fo'
                      | 'fr'
                      | 'ga'
                      | 'gl'
                      | 'he'
                      | 'hi'
                      | 'hu'
                      | 'hy'
                      | 'id'
                      | 'is'
                      | 'it'
                      | 'ja'
                      | 'ka'
                      | 'kk'
                      | 'ko'
                      | 'ku'
                      | 'ky'
                      | 'lt'
                      | 'lv'
                      | 'mi'
                      | 'mn'
                      | 'mr'
                      | 'ms'
                      | 'mt'
                      | 'nb'
                      | 'nl'
                      | 'no'
                      | 'ns'
                      | 'pl'
                      | 'ps'
                      | 'pt'
                      | 'pt-br'
                      | 'qu'
                      | 'ro'
                      | 'ru'
                      | 'sk'
                      | 'sq'
                      | 'sv'
                      | 'sw'
                      | 'ta'
                      | 'te'
                      | 'th'
                      | 'tl'
                      | 'tn'
                      | 'tr'
                      | 'tt'
                      | 'uk'
                      | 'ur'
                      | 'uz'
                      | 'zh'
                      | undefined
                    word?: string | undefined
                    words?: string[] | undefined
                    decomposition?: string[] | undefined
                    state?: 'enabled' | 'disabled' | undefined
                    type?: 'custom' | 'standard' | undefined
                  }
                }[]
              }
            }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 404
          }
    }
  } & {
    '/1/dictionaries/:dictionaryName/search': {
      $post:
        | {
            input: { param: { dictionaryName: 'plurals' | 'stopwords' | 'compounds' } } & {
              json: {
                query: string
                page?: number | undefined
                hitsPerPage?: number | undefined
                language?:
                  | 'af'
                  | 'ar'
                  | 'az'
                  | 'bg'
                  | 'bn'
                  | 'ca'
                  | 'cs'
                  | 'cy'
                  | 'da'
                  | 'de'
                  | 'el'
                  | 'en'
                  | 'eo'
                  | 'es'
                  | 'et'
                  | 'eu'
                  | 'fa'
                  | 'fi'
                  | 'fo'
                  | 'fr'
                  | 'ga'
                  | 'gl'
                  | 'he'
                  | 'hi'
                  | 'hu'
                  | 'hy'
                  | 'id'
                  | 'is'
                  | 'it'
                  | 'ja'
                  | 'ka'
                  | 'kk'
                  | 'ko'
                  | 'ku'
                  | 'ky'
                  | 'lt'
                  | 'lv'
                  | 'mi'
                  | 'mn'
                  | 'mr'
                  | 'ms'
                  | 'mt'
                  | 'nb'
                  | 'nl'
                  | 'no'
                  | 'ns'
                  | 'pl'
                  | 'ps'
                  | 'pt'
                  | 'pt-br'
                  | 'qu'
                  | 'ro'
                  | 'ru'
                  | 'sk'
                  | 'sq'
                  | 'sv'
                  | 'sw'
                  | 'ta'
                  | 'te'
                  | 'th'
                  | 'tl'
                  | 'tn'
                  | 'tr'
                  | 'tt'
                  | 'uk'
                  | 'ur'
                  | 'uz'
                  | 'zh'
                  | undefined
              }
            }
            output: {
              hits: {
                objectID: string
                language?:
                  | 'af'
                  | 'ar'
                  | 'az'
                  | 'bg'
                  | 'bn'
                  | 'ca'
                  | 'cs'
                  | 'cy'
                  | 'da'
                  | 'de'
                  | 'el'
                  | 'en'
                  | 'eo'
                  | 'es'
                  | 'et'
                  | 'eu'
                  | 'fa'
                  | 'fi'
                  | 'fo'
                  | 'fr'
                  | 'ga'
                  | 'gl'
                  | 'he'
                  | 'hi'
                  | 'hu'
                  | 'hy'
                  | 'id'
                  | 'is'
                  | 'it'
                  | 'ja'
                  | 'ka'
                  | 'kk'
                  | 'ko'
                  | 'ku'
                  | 'ky'
                  | 'lt'
                  | 'lv'
                  | 'mi'
                  | 'mn'
                  | 'mr'
                  | 'ms'
                  | 'mt'
                  | 'nb'
                  | 'nl'
                  | 'no'
                  | 'ns'
                  | 'pl'
                  | 'ps'
                  | 'pt'
                  | 'pt-br'
                  | 'qu'
                  | 'ro'
                  | 'ru'
                  | 'sk'
                  | 'sq'
                  | 'sv'
                  | 'sw'
                  | 'ta'
                  | 'te'
                  | 'th'
                  | 'tl'
                  | 'tn'
                  | 'tr'
                  | 'tt'
                  | 'uk'
                  | 'ur'
                  | 'uz'
                  | 'zh'
                  | undefined
                word?: string | undefined
                words?: string[] | undefined
                decomposition?: string[] | undefined
                state?: 'enabled' | 'disabled' | undefined
                type?: 'custom' | 'standard' | undefined
              }[]
              page: number
              nbHits: number
              nbPages: number
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { param: { dictionaryName: 'plurals' | 'stopwords' | 'compounds' } } & {
              json: {
                query: string
                page?: number | undefined
                hitsPerPage?: number | undefined
                language?:
                  | 'af'
                  | 'ar'
                  | 'az'
                  | 'bg'
                  | 'bn'
                  | 'ca'
                  | 'cs'
                  | 'cy'
                  | 'da'
                  | 'de'
                  | 'el'
                  | 'en'
                  | 'eo'
                  | 'es'
                  | 'et'
                  | 'eu'
                  | 'fa'
                  | 'fi'
                  | 'fo'
                  | 'fr'
                  | 'ga'
                  | 'gl'
                  | 'he'
                  | 'hi'
                  | 'hu'
                  | 'hy'
                  | 'id'
                  | 'is'
                  | 'it'
                  | 'ja'
                  | 'ka'
                  | 'kk'
                  | 'ko'
                  | 'ku'
                  | 'ky'
                  | 'lt'
                  | 'lv'
                  | 'mi'
                  | 'mn'
                  | 'mr'
                  | 'ms'
                  | 'mt'
                  | 'nb'
                  | 'nl'
                  | 'no'
                  | 'ns'
                  | 'pl'
                  | 'ps'
                  | 'pt'
                  | 'pt-br'
                  | 'qu'
                  | 'ro'
                  | 'ru'
                  | 'sk'
                  | 'sq'
                  | 'sv'
                  | 'sw'
                  | 'ta'
                  | 'te'
                  | 'th'
                  | 'tl'
                  | 'tn'
                  | 'tr'
                  | 'tt'
                  | 'uk'
                  | 'ur'
                  | 'uz'
                  | 'zh'
                  | undefined
              }
            }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 400
          }
        | {
            input: { param: { dictionaryName: 'plurals' | 'stopwords' | 'compounds' } } & {
              json: {
                query: string
                page?: number | undefined
                hitsPerPage?: number | undefined
                language?:
                  | 'af'
                  | 'ar'
                  | 'az'
                  | 'bg'
                  | 'bn'
                  | 'ca'
                  | 'cs'
                  | 'cy'
                  | 'da'
                  | 'de'
                  | 'el'
                  | 'en'
                  | 'eo'
                  | 'es'
                  | 'et'
                  | 'eu'
                  | 'fa'
                  | 'fi'
                  | 'fo'
                  | 'fr'
                  | 'ga'
                  | 'gl'
                  | 'he'
                  | 'hi'
                  | 'hu'
                  | 'hy'
                  | 'id'
                  | 'is'
                  | 'it'
                  | 'ja'
                  | 'ka'
                  | 'kk'
                  | 'ko'
                  | 'ku'
                  | 'ky'
                  | 'lt'
                  | 'lv'
                  | 'mi'
                  | 'mn'
                  | 'mr'
                  | 'ms'
                  | 'mt'
                  | 'nb'
                  | 'nl'
                  | 'no'
                  | 'ns'
                  | 'pl'
                  | 'ps'
                  | 'pt'
                  | 'pt-br'
                  | 'qu'
                  | 'ro'
                  | 'ru'
                  | 'sk'
                  | 'sq'
                  | 'sv'
                  | 'sw'
                  | 'ta'
                  | 'te'
                  | 'th'
                  | 'tl'
                  | 'tn'
                  | 'tr'
                  | 'tt'
                  | 'uk'
                  | 'ur'
                  | 'uz'
                  | 'zh'
                  | undefined
              }
            }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 402
          }
        | {
            input: { param: { dictionaryName: 'plurals' | 'stopwords' | 'compounds' } } & {
              json: {
                query: string
                page?: number | undefined
                hitsPerPage?: number | undefined
                language?:
                  | 'af'
                  | 'ar'
                  | 'az'
                  | 'bg'
                  | 'bn'
                  | 'ca'
                  | 'cs'
                  | 'cy'
                  | 'da'
                  | 'de'
                  | 'el'
                  | 'en'
                  | 'eo'
                  | 'es'
                  | 'et'
                  | 'eu'
                  | 'fa'
                  | 'fi'
                  | 'fo'
                  | 'fr'
                  | 'ga'
                  | 'gl'
                  | 'he'
                  | 'hi'
                  | 'hu'
                  | 'hy'
                  | 'id'
                  | 'is'
                  | 'it'
                  | 'ja'
                  | 'ka'
                  | 'kk'
                  | 'ko'
                  | 'ku'
                  | 'ky'
                  | 'lt'
                  | 'lv'
                  | 'mi'
                  | 'mn'
                  | 'mr'
                  | 'ms'
                  | 'mt'
                  | 'nb'
                  | 'nl'
                  | 'no'
                  | 'ns'
                  | 'pl'
                  | 'ps'
                  | 'pt'
                  | 'pt-br'
                  | 'qu'
                  | 'ro'
                  | 'ru'
                  | 'sk'
                  | 'sq'
                  | 'sv'
                  | 'sw'
                  | 'ta'
                  | 'te'
                  | 'th'
                  | 'tl'
                  | 'tn'
                  | 'tr'
                  | 'tt'
                  | 'uk'
                  | 'ur'
                  | 'uz'
                  | 'zh'
                  | undefined
              }
            }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 403
          }
        | {
            input: { param: { dictionaryName: 'plurals' | 'stopwords' | 'compounds' } } & {
              json: {
                query: string
                page?: number | undefined
                hitsPerPage?: number | undefined
                language?:
                  | 'af'
                  | 'ar'
                  | 'az'
                  | 'bg'
                  | 'bn'
                  | 'ca'
                  | 'cs'
                  | 'cy'
                  | 'da'
                  | 'de'
                  | 'el'
                  | 'en'
                  | 'eo'
                  | 'es'
                  | 'et'
                  | 'eu'
                  | 'fa'
                  | 'fi'
                  | 'fo'
                  | 'fr'
                  | 'ga'
                  | 'gl'
                  | 'he'
                  | 'hi'
                  | 'hu'
                  | 'hy'
                  | 'id'
                  | 'is'
                  | 'it'
                  | 'ja'
                  | 'ka'
                  | 'kk'
                  | 'ko'
                  | 'ku'
                  | 'ky'
                  | 'lt'
                  | 'lv'
                  | 'mi'
                  | 'mn'
                  | 'mr'
                  | 'ms'
                  | 'mt'
                  | 'nb'
                  | 'nl'
                  | 'no'
                  | 'ns'
                  | 'pl'
                  | 'ps'
                  | 'pt'
                  | 'pt-br'
                  | 'qu'
                  | 'ro'
                  | 'ru'
                  | 'sk'
                  | 'sq'
                  | 'sv'
                  | 'sw'
                  | 'ta'
                  | 'te'
                  | 'th'
                  | 'tl'
                  | 'tn'
                  | 'tr'
                  | 'tt'
                  | 'uk'
                  | 'ur'
                  | 'uz'
                  | 'zh'
                  | undefined
              }
            }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 404
          }
    }
  } & {
    '/1/dictionaries/*/settings': {
      $get:
        | {
            input: {}
            output: {
              disableStandardEntries: {
                plurals?: { [x: string]: boolean } | ({ [x: string]: unknown } | null) | undefined
                stopwords?: { [x: string]: boolean } | ({ [x: string]: unknown } | null) | undefined
                compounds?: { [x: string]: boolean } | ({ [x: string]: unknown } | null) | undefined
              }
            }
            outputFormat: 'json'
            status: 200
          }
        | { input: {}; output: { message?: string | undefined }; outputFormat: 'json'; status: 400 }
        | { input: {}; output: { message?: string | undefined }; outputFormat: 'json'; status: 402 }
        | { input: {}; output: { message?: string | undefined }; outputFormat: 'json'; status: 403 }
        | { input: {}; output: { message?: string | undefined }; outputFormat: 'json'; status: 404 }
      $put:
        | {
            input: {
              json: {
                disableStandardEntries: {
                  plurals?: { [x: string]: boolean } | ({ [x: string]: unknown } | null) | undefined
                  stopwords?:
                    | { [x: string]: boolean }
                    | ({ [x: string]: unknown } | null)
                    | undefined
                  compounds?:
                    | { [x: string]: boolean }
                    | ({ [x: string]: unknown } | null)
                    | undefined
                }
              }
            }
            output: { taskID: bigint; updatedAt: string }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: {
              json: {
                disableStandardEntries: {
                  plurals?: { [x: string]: boolean } | ({ [x: string]: unknown } | null) | undefined
                  stopwords?:
                    | { [x: string]: boolean }
                    | ({ [x: string]: unknown } | null)
                    | undefined
                  compounds?:
                    | { [x: string]: boolean }
                    | ({ [x: string]: unknown } | null)
                    | undefined
                }
              }
            }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 400
          }
        | {
            input: {
              json: {
                disableStandardEntries: {
                  plurals?: { [x: string]: boolean } | ({ [x: string]: unknown } | null) | undefined
                  stopwords?:
                    | { [x: string]: boolean }
                    | ({ [x: string]: unknown } | null)
                    | undefined
                  compounds?:
                    | { [x: string]: boolean }
                    | ({ [x: string]: unknown } | null)
                    | undefined
                }
              }
            }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 402
          }
        | {
            input: {
              json: {
                disableStandardEntries: {
                  plurals?: { [x: string]: boolean } | ({ [x: string]: unknown } | null) | undefined
                  stopwords?:
                    | { [x: string]: boolean }
                    | ({ [x: string]: unknown } | null)
                    | undefined
                  compounds?:
                    | { [x: string]: boolean }
                    | ({ [x: string]: unknown } | null)
                    | undefined
                }
              }
            }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 403
          }
        | {
            input: {
              json: {
                disableStandardEntries: {
                  plurals?: { [x: string]: boolean } | ({ [x: string]: unknown } | null) | undefined
                  stopwords?:
                    | { [x: string]: boolean }
                    | ({ [x: string]: unknown } | null)
                    | undefined
                  compounds?:
                    | { [x: string]: boolean }
                    | ({ [x: string]: unknown } | null)
                    | undefined
                }
              }
            }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 404
          }
    }
  } & {
    '/1/dictionaries/*/languages': {
      $get:
        | {
            input: {}
            output: {
              [x: string]: {
                plurals:
                  | { nbCustomEntries?: number | undefined }
                  | ({ [x: string]: unknown } | null)
                stopwords:
                  | { nbCustomEntries?: number | undefined }
                  | ({ [x: string]: unknown } | null)
                compounds:
                  | { nbCustomEntries?: number | undefined }
                  | ({ [x: string]: unknown } | null)
              }
            }
            outputFormat: 'json'
            status: 200
          }
        | { input: {}; output: { message?: string | undefined }; outputFormat: 'json'; status: 400 }
        | { input: {}; output: { message?: string | undefined }; outputFormat: 'json'; status: 402 }
        | { input: {}; output: { message?: string | undefined }; outputFormat: 'json'; status: 403 }
        | { input: {}; output: { message?: string | undefined }; outputFormat: 'json'; status: 404 }
    }
  } & {
    '/1/clusters/mapping': {
      $post:
        | {
            input: { header: { 'X-Algolia-User-ID': string } } & { json: { cluster: string } }
            output: { createdAt: string }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { header: { 'X-Algolia-User-ID': string } } & { json: { cluster: string } }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 400
          }
        | {
            input: { header: { 'X-Algolia-User-ID': string } } & { json: { cluster: string } }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 402
          }
        | {
            input: { header: { 'X-Algolia-User-ID': string } } & { json: { cluster: string } }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 403
          }
        | {
            input: { header: { 'X-Algolia-User-ID': string } } & { json: { cluster: string } }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 404
          }
      $get:
        | {
            input: {
              query: {
                page?: number | ({ [x: string]: unknown } | null) | undefined
                hitsPerPage?: number | undefined
              }
            }
            output: {
              userIDs: {
                userID: string
                clusterName: string
                nbRecords: number
                dataSize: number
              }[]
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: {
              query: {
                page?: number | ({ [x: string]: unknown } | null) | undefined
                hitsPerPage?: number | undefined
              }
            }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 400
          }
        | {
            input: {
              query: {
                page?: number | ({ [x: string]: unknown } | null) | undefined
                hitsPerPage?: number | undefined
              }
            }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 402
          }
        | {
            input: {
              query: {
                page?: number | ({ [x: string]: unknown } | null) | undefined
                hitsPerPage?: number | undefined
              }
            }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 403
          }
        | {
            input: {
              query: {
                page?: number | ({ [x: string]: unknown } | null) | undefined
                hitsPerPage?: number | undefined
              }
            }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 404
          }
    }
  } & {
    '/1/clusters/mapping/batch': {
      $post:
        | {
            input: { header: { 'X-Algolia-User-ID': string } } & {
              json: { cluster: string; users: string[] }
            }
            output: { createdAt: string }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { header: { 'X-Algolia-User-ID': string } } & {
              json: { cluster: string; users: string[] }
            }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 400
          }
        | {
            input: { header: { 'X-Algolia-User-ID': string } } & {
              json: { cluster: string; users: string[] }
            }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 402
          }
        | {
            input: { header: { 'X-Algolia-User-ID': string } } & {
              json: { cluster: string; users: string[] }
            }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 403
          }
        | {
            input: { header: { 'X-Algolia-User-ID': string } } & {
              json: { cluster: string; users: string[] }
            }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 404
          }
    }
  } & {
    '/1/clusters/mapping/top': {
      $get:
        | {
            input: {}
            output: {
              topUsers: {
                [x: string]: {
                  userID: string
                  clusterName: string
                  nbRecords: number
                  dataSize: number
                }[]
              }[]
            }
            outputFormat: 'json'
            status: 200
          }
        | { input: {}; output: { message?: string | undefined }; outputFormat: 'json'; status: 400 }
        | { input: {}; output: { message?: string | undefined }; outputFormat: 'json'; status: 402 }
        | { input: {}; output: { message?: string | undefined }; outputFormat: 'json'; status: 403 }
        | { input: {}; output: { message?: string | undefined }; outputFormat: 'json'; status: 404 }
    }
  } & {
    '/1/clusters/mapping/:userID': {
      $get:
        | {
            input: { param: { userID: string } }
            output: { userID: string; clusterName: string; nbRecords: number; dataSize: number }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { param: { userID: string } }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 400
          }
        | {
            input: { param: { userID: string } }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 402
          }
        | {
            input: { param: { userID: string } }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 403
          }
        | {
            input: { param: { userID: string } }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 404
          }
      $delete:
        | {
            input: { param: { userID: string } }
            output: { deletedAt: string }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { param: { userID: string } }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 400
          }
        | {
            input: { param: { userID: string } }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 402
          }
        | {
            input: { param: { userID: string } }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 403
          }
        | {
            input: { param: { userID: string } }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 404
          }
    }
  } & {
    '/1/clusters': {
      $get:
        | { input: {}; output: { topUsers: string[] }; outputFormat: 'json'; status: 200 }
        | { input: {}; output: { message?: string | undefined }; outputFormat: 'json'; status: 400 }
        | { input: {}; output: { message?: string | undefined }; outputFormat: 'json'; status: 402 }
        | { input: {}; output: { message?: string | undefined }; outputFormat: 'json'; status: 403 }
        | { input: {}; output: { message?: string | undefined }; outputFormat: 'json'; status: 404 }
    }
  } & {
    '/1/clusters/mapping/search': {
      $post:
        | {
            input: {
              json: {
                query: string
                clusterName?: string | undefined
                page?: number | undefined
                hitsPerPage?: number | undefined
              }
            }
            output: {
              hits: {
                userID: string
                clusterName: string
                nbRecords: number
                dataSize: number
                objectID: string
                _highlightResult: {
                  userID:
                    | {
                        value: string
                        matchLevel: 'none' | 'partial' | 'full'
                        matchedWords: string[]
                        fullyHighlighted?: boolean | undefined
                      }
                    | { [x: string]: unknown }
                    | unknown[]
                  clusterName:
                    | {
                        value: string
                        matchLevel: 'none' | 'partial' | 'full'
                        matchedWords: string[]
                        fullyHighlighted?: boolean | undefined
                      }
                    | { [x: string]: unknown }
                    | unknown[]
                }
              }[]
              nbHits: number
              page: number
              hitsPerPage: number
              updatedAt: string
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: {
              json: {
                query: string
                clusterName?: string | undefined
                page?: number | undefined
                hitsPerPage?: number | undefined
              }
            }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 400
          }
        | {
            input: {
              json: {
                query: string
                clusterName?: string | undefined
                page?: number | undefined
                hitsPerPage?: number | undefined
              }
            }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 402
          }
        | {
            input: {
              json: {
                query: string
                clusterName?: string | undefined
                page?: number | undefined
                hitsPerPage?: number | undefined
              }
            }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 403
          }
        | {
            input: {
              json: {
                query: string
                clusterName?: string | undefined
                page?: number | undefined
                hitsPerPage?: number | undefined
              }
            }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 404
          }
    }
  } & {
    '/1/clusters/mapping/pending': {
      $get:
        | {
            input: { query: { getClusters?: boolean | undefined } }
            output: { pending: boolean; clusters?: { [x: string]: string[] } | undefined }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { query: { getClusters?: boolean | undefined } }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 400
          }
        | {
            input: { query: { getClusters?: boolean | undefined } }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 402
          }
        | {
            input: { query: { getClusters?: boolean | undefined } }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 403
          }
        | {
            input: { query: { getClusters?: boolean | undefined } }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 404
          }
    }
  } & {
    '/1/security/sources': {
      $get:
        | {
            input: {}
            output: { source: string; description?: string | undefined }[]
            outputFormat: 'json'
            status: 200
          }
        | { input: {}; output: { message?: string | undefined }; outputFormat: 'json'; status: 400 }
        | { input: {}; output: { message?: string | undefined }; outputFormat: 'json'; status: 402 }
        | { input: {}; output: { message?: string | undefined }; outputFormat: 'json'; status: 403 }
        | { input: {}; output: { message?: string | undefined }; outputFormat: 'json'; status: 404 }
      $put:
        | {
            input: { json: { source: string; description?: string | undefined }[] }
            output: { updatedAt: string }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { json: { source: string; description?: string | undefined }[] }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 400
          }
        | {
            input: { json: { source: string; description?: string | undefined }[] }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 402
          }
        | {
            input: { json: { source: string; description?: string | undefined }[] }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 403
          }
        | {
            input: { json: { source: string; description?: string | undefined }[] }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 404
          }
    }
  } & {
    '/1/security/sources/append': {
      $post:
        | {
            input: { json: { source: string; description?: string | undefined } }
            output: { createdAt: string }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { json: { source: string; description?: string | undefined } }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 400
          }
        | {
            input: { json: { source: string; description?: string | undefined } }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 402
          }
        | {
            input: { json: { source: string; description?: string | undefined } }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 403
          }
        | {
            input: { json: { source: string; description?: string | undefined } }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 404
          }
    }
  } & {
    '/1/security/sources/:source': {
      $delete:
        | {
            input: { param: { source: string } }
            output: { deletedAt: string }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { param: { source: string } }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 400
          }
        | {
            input: { param: { source: string } }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 402
          }
        | {
            input: { param: { source: string } }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 403
          }
        | {
            input: { param: { source: string } }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 404
          }
    }
  } & {
    '/1/logs': {
      $get:
        | {
            input: {
              query: {
                offset?: number | undefined
                length?: number | undefined
                indexName?: string | ({ [x: string]: unknown } | null) | undefined
                type?: 'all' | 'query' | 'build' | 'error' | undefined
              }
            }
            output: {
              logs: {
                timestamp: string
                method: string
                answer_code: string
                query_body: string
                answer: string
                url: string
                ip: string
                query_headers: string
                sha1: string
                nb_api_calls?: string | undefined
                processing_time_ms: string
                index?: string | undefined
                query_params?: string | undefined
                query_nb_hits?: string | undefined
                inner_queries?:
                  | {
                      index_name?: string | undefined
                      user_token?: string | undefined
                      query_id?: string | undefined
                    }[]
                  | undefined
              }[]
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: {
              query: {
                offset?: number | undefined
                length?: number | undefined
                indexName?: string | ({ [x: string]: unknown } | null) | undefined
                type?: 'all' | 'query' | 'build' | 'error' | undefined
              }
            }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 400
          }
        | {
            input: {
              query: {
                offset?: number | undefined
                length?: number | undefined
                indexName?: string | ({ [x: string]: unknown } | null) | undefined
                type?: 'all' | 'query' | 'build' | 'error' | undefined
              }
            }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 402
          }
        | {
            input: {
              query: {
                offset?: number | undefined
                length?: number | undefined
                indexName?: string | ({ [x: string]: unknown } | null) | undefined
                type?: 'all' | 'query' | 'build' | 'error' | undefined
              }
            }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 403
          }
        | {
            input: {
              query: {
                offset?: number | undefined
                length?: number | undefined
                indexName?: string | ({ [x: string]: unknown } | null) | undefined
                type?: 'all' | 'query' | 'build' | 'error' | undefined
              }
            }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 404
          }
    }
  } & {
    '/1/task/:taskID': {
      $get:
        | {
            input: { param: { taskID: bigint } }
            output: { status: 'published' | 'notPublished' }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { param: { taskID: bigint } }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 400
          }
        | {
            input: { param: { taskID: bigint } }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 402
          }
        | {
            input: { param: { taskID: bigint } }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 403
          }
    }
  } & {
    '/1/indexes/:indexName/task/:taskID': {
      $get:
        | {
            input: { param: { indexName: string; taskID: bigint } }
            output: { status: 'published' | 'notPublished' }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { param: { indexName: string; taskID: bigint } }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 400
          }
        | {
            input: { param: { indexName: string; taskID: bigint } }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 402
          }
        | {
            input: { param: { indexName: string; taskID: bigint } }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 403
          }
        | {
            input: { param: { indexName: string; taskID: bigint } }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 404
          }
    }
  } & {
    '/1/indexes/:indexName/operation': {
      $post:
        | {
            input: { param: { indexName: string } } & {
              json: {
                operation: 'move' | 'copy'
                destination: string
                scope?: ('settings' | 'synonyms' | 'rules')[] | undefined
              }
            }
            output: { taskID: bigint; updatedAt: string }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { param: { indexName: string } } & {
              json: {
                operation: 'move' | 'copy'
                destination: string
                scope?: ('settings' | 'synonyms' | 'rules')[] | undefined
              }
            }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 400
          }
        | {
            input: { param: { indexName: string } } & {
              json: {
                operation: 'move' | 'copy'
                destination: string
                scope?: ('settings' | 'synonyms' | 'rules')[] | undefined
              }
            }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 402
          }
        | {
            input: { param: { indexName: string } } & {
              json: {
                operation: 'move' | 'copy'
                destination: string
                scope?: ('settings' | 'synonyms' | 'rules')[] | undefined
              }
            }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 403
          }
        | {
            input: { param: { indexName: string } } & {
              json: {
                operation: 'move' | 'copy'
                destination: string
                scope?: ('settings' | 'synonyms' | 'rules')[] | undefined
              }
            }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 404
          }
    }
  } & {
    '/1/indexes': {
      $get:
        | {
            input: {
              query: {
                page?: number | ({ [x: string]: unknown } | null) | undefined
                hitsPerPage?: number | undefined
              }
            }
            output: {
              items: {
                name: string
                createdAt: string
                updatedAt: string
                entries: number
                dataSize: bigint
                fileSize: bigint
                lastBuildTimeS: number
                numberOfPendingTasks: number
                pendingTask: boolean
                primary?: string | undefined
                replicas?: string[] | undefined
                virtual?: boolean | undefined
              }[]
              nbPages?: number | undefined
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: {
              query: {
                page?: number | ({ [x: string]: unknown } | null) | undefined
                hitsPerPage?: number | undefined
              }
            }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 400
          }
        | {
            input: {
              query: {
                page?: number | ({ [x: string]: unknown } | null) | undefined
                hitsPerPage?: number | undefined
              }
            }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 402
          }
        | {
            input: {
              query: {
                page?: number | ({ [x: string]: unknown } | null) | undefined
                hitsPerPage?: number | undefined
              }
            }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 403
          }
        | {
            input: {
              query: {
                page?: number | ({ [x: string]: unknown } | null) | undefined
                hitsPerPage?: number | undefined
              }
            }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 404
          }
    }
  } & {
    '/waitForApiKey': {
      $get:
        | {
            input: {
              query: {
                key: string
                operation: 'add' | 'delete' | 'update'
                apiKey?:
                  | {
                      acl: (
                        | 'addObject'
                        | 'analytics'
                        | 'browse'
                        | 'deleteObject'
                        | 'deleteIndex'
                        | 'editSettings'
                        | 'inference'
                        | 'listIndexes'
                        | 'logs'
                        | 'personalization'
                        | 'recommendation'
                        | 'search'
                        | 'seeUnretrievableAttributes'
                        | 'settings'
                        | 'usage'
                        | 'nluWriteProject'
                        | 'nluReadProject'
                        | 'nluWriteEntity'
                        | 'nluReadEntity'
                        | 'nluWriteIntent'
                        | 'nluReadIntent'
                        | 'nluPrediction'
                        | 'nluReadAnswers'
                      )[]
                      description?: string | undefined
                      indexes?: string[] | undefined
                      maxHitsPerQuery?: number | undefined
                      maxQueriesPerIPPerHour?: number | undefined
                      queryParameters?: string | undefined
                      referers?: string[] | undefined
                      validity?: number | undefined
                    }
                  | undefined
              }
            }
            output: {
              value: string
              createdAt: bigint
              acl: (
                | 'addObject'
                | 'analytics'
                | 'browse'
                | 'deleteObject'
                | 'deleteIndex'
                | 'editSettings'
                | 'inference'
                | 'listIndexes'
                | 'logs'
                | 'personalization'
                | 'recommendation'
                | 'search'
                | 'seeUnretrievableAttributes'
                | 'settings'
                | 'usage'
                | 'nluWriteProject'
                | 'nluReadProject'
                | 'nluWriteEntity'
                | 'nluReadEntity'
                | 'nluWriteIntent'
                | 'nluReadIntent'
                | 'nluPrediction'
                | 'nluReadAnswers'
              )[]
              description?: string | undefined
              indexes?: string[] | undefined
              maxHitsPerQuery?: number | undefined
              maxQueriesPerIPPerHour?: number | undefined
              queryParameters?: string | undefined
              referers?: string[] | undefined
              validity?: number | undefined
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: {
              query: {
                key: string
                operation: 'add' | 'delete' | 'update'
                apiKey?:
                  | {
                      acl: (
                        | 'addObject'
                        | 'analytics'
                        | 'browse'
                        | 'deleteObject'
                        | 'deleteIndex'
                        | 'editSettings'
                        | 'inference'
                        | 'listIndexes'
                        | 'logs'
                        | 'personalization'
                        | 'recommendation'
                        | 'search'
                        | 'seeUnretrievableAttributes'
                        | 'settings'
                        | 'usage'
                        | 'nluWriteProject'
                        | 'nluReadProject'
                        | 'nluWriteEntity'
                        | 'nluReadEntity'
                        | 'nluWriteIntent'
                        | 'nluReadIntent'
                        | 'nluPrediction'
                        | 'nluReadAnswers'
                      )[]
                      description?: string | undefined
                      indexes?: string[] | undefined
                      maxHitsPerQuery?: number | undefined
                      maxQueriesPerIPPerHour?: number | undefined
                      queryParameters?: string | undefined
                      referers?: string[] | undefined
                      validity?: number | undefined
                    }
                  | undefined
              }
            }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 400
          }
    }
  } & {
    '/waitForTask': {
      $get:
        | {
            input: { query: { indexName: string; taskID: bigint } }
            output: { status: 'published' | 'notPublished' }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { query: { indexName: string; taskID: bigint } }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 400
          }
    }
  } & {
    '/waitForAppTask': {
      $get:
        | {
            input: { query: { taskID: bigint } }
            output: { status: 'published' | 'notPublished' }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { query: { taskID: bigint } }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 400
          }
    }
  } & {
    '/browseObjects': {
      $get:
        | {
            input: {
              query: {
                indexName: string
                browseParams: {
                  query?: string | undefined
                  similarQuery?: string | undefined
                  filters?: string | undefined
                  facetFilters?: unknown[] | string | undefined
                  optionalFilters?: unknown[] | string | undefined
                  numericFilters?: unknown[] | string | undefined
                  tagFilters?: unknown[] | string | undefined
                  sumOrFiltersScores?: boolean | undefined
                  restrictSearchableAttributes?: string[] | undefined
                  facets?: string[] | undefined
                  facetingAfterDistinct?: boolean | undefined
                  page?: number | undefined
                  offset?: number | undefined
                  length?: number | undefined
                  aroundLatLng?: string | undefined
                  aroundLatLngViaIP?: boolean | undefined
                  aroundRadius?: number | 'all' | undefined
                  aroundPrecision?:
                    | number
                    | { from?: number | undefined; value?: number | undefined }[]
                    | undefined
                  minimumAroundRadius?: number | undefined
                  insideBoundingBox?:
                    | string
                    | ({ [x: string]: unknown } | null)
                    | number[][]
                    | undefined
                  insidePolygon?: number[][] | undefined
                  naturalLanguages?:
                    | (
                        | 'af'
                        | 'ar'
                        | 'az'
                        | 'bg'
                        | 'bn'
                        | 'ca'
                        | 'cs'
                        | 'cy'
                        | 'da'
                        | 'de'
                        | 'el'
                        | 'en'
                        | 'eo'
                        | 'es'
                        | 'et'
                        | 'eu'
                        | 'fa'
                        | 'fi'
                        | 'fo'
                        | 'fr'
                        | 'ga'
                        | 'gl'
                        | 'he'
                        | 'hi'
                        | 'hu'
                        | 'hy'
                        | 'id'
                        | 'is'
                        | 'it'
                        | 'ja'
                        | 'ka'
                        | 'kk'
                        | 'ko'
                        | 'ku'
                        | 'ky'
                        | 'lt'
                        | 'lv'
                        | 'mi'
                        | 'mn'
                        | 'mr'
                        | 'ms'
                        | 'mt'
                        | 'nb'
                        | 'nl'
                        | 'no'
                        | 'ns'
                        | 'pl'
                        | 'ps'
                        | 'pt'
                        | 'pt-br'
                        | 'qu'
                        | 'ro'
                        | 'ru'
                        | 'sk'
                        | 'sq'
                        | 'sv'
                        | 'sw'
                        | 'ta'
                        | 'te'
                        | 'th'
                        | 'tl'
                        | 'tn'
                        | 'tr'
                        | 'tt'
                        | 'uk'
                        | 'ur'
                        | 'uz'
                        | 'zh'
                      )[]
                    | undefined
                  ruleContexts?: string[] | undefined
                  personalizationImpact?: number | undefined
                  userToken?: string | undefined
                  getRankingInfo?: boolean | undefined
                  synonyms?: boolean | undefined
                  clickAnalytics?: boolean | undefined
                  analytics?: boolean | undefined
                  analyticsTags?: string[] | undefined
                  percentileComputation?: boolean | undefined
                  enableABTest?: boolean | undefined
                  attributesToRetrieve?: string[] | undefined
                  ranking?: string[] | undefined
                  relevancyStrictness?: number | undefined
                  attributesToHighlight?: string[] | undefined
                  attributesToSnippet?: string[] | undefined
                  highlightPreTag?: string | undefined
                  highlightPostTag?: string | undefined
                  snippetEllipsisText?: string | undefined
                  restrictHighlightAndSnippetArrays?: boolean | undefined
                  hitsPerPage?: number | undefined
                  minWordSizefor1Typo?: number | undefined
                  minWordSizefor2Typos?: number | undefined
                  typoTolerance?: boolean | 'min' | 'strict' | 'true' | 'false' | undefined
                  allowTyposOnNumericTokens?: boolean | undefined
                  disableTypoToleranceOnAttributes?: string[] | undefined
                  ignorePlurals?:
                    | (
                        | 'af'
                        | 'ar'
                        | 'az'
                        | 'bg'
                        | 'bn'
                        | 'ca'
                        | 'cs'
                        | 'cy'
                        | 'da'
                        | 'de'
                        | 'el'
                        | 'en'
                        | 'eo'
                        | 'es'
                        | 'et'
                        | 'eu'
                        | 'fa'
                        | 'fi'
                        | 'fo'
                        | 'fr'
                        | 'ga'
                        | 'gl'
                        | 'he'
                        | 'hi'
                        | 'hu'
                        | 'hy'
                        | 'id'
                        | 'is'
                        | 'it'
                        | 'ja'
                        | 'ka'
                        | 'kk'
                        | 'ko'
                        | 'ku'
                        | 'ky'
                        | 'lt'
                        | 'lv'
                        | 'mi'
                        | 'mn'
                        | 'mr'
                        | 'ms'
                        | 'mt'
                        | 'nb'
                        | 'nl'
                        | 'no'
                        | 'ns'
                        | 'pl'
                        | 'ps'
                        | 'pt'
                        | 'pt-br'
                        | 'qu'
                        | 'ro'
                        | 'ru'
                        | 'sk'
                        | 'sq'
                        | 'sv'
                        | 'sw'
                        | 'ta'
                        | 'te'
                        | 'th'
                        | 'tl'
                        | 'tn'
                        | 'tr'
                        | 'tt'
                        | 'uk'
                        | 'ur'
                        | 'uz'
                        | 'zh'
                      )[]
                    | 'true'
                    | 'false'
                    | boolean
                    | undefined
                  removeStopWords?:
                    | (
                        | 'af'
                        | 'ar'
                        | 'az'
                        | 'bg'
                        | 'bn'
                        | 'ca'
                        | 'cs'
                        | 'cy'
                        | 'da'
                        | 'de'
                        | 'el'
                        | 'en'
                        | 'eo'
                        | 'es'
                        | 'et'
                        | 'eu'
                        | 'fa'
                        | 'fi'
                        | 'fo'
                        | 'fr'
                        | 'ga'
                        | 'gl'
                        | 'he'
                        | 'hi'
                        | 'hu'
                        | 'hy'
                        | 'id'
                        | 'is'
                        | 'it'
                        | 'ja'
                        | 'ka'
                        | 'kk'
                        | 'ko'
                        | 'ku'
                        | 'ky'
                        | 'lt'
                        | 'lv'
                        | 'mi'
                        | 'mn'
                        | 'mr'
                        | 'ms'
                        | 'mt'
                        | 'nb'
                        | 'nl'
                        | 'no'
                        | 'ns'
                        | 'pl'
                        | 'ps'
                        | 'pt'
                        | 'pt-br'
                        | 'qu'
                        | 'ro'
                        | 'ru'
                        | 'sk'
                        | 'sq'
                        | 'sv'
                        | 'sw'
                        | 'ta'
                        | 'te'
                        | 'th'
                        | 'tl'
                        | 'tn'
                        | 'tr'
                        | 'tt'
                        | 'uk'
                        | 'ur'
                        | 'uz'
                        | 'zh'
                      )[]
                    | boolean
                    | undefined
                  queryLanguages?:
                    | (
                        | 'af'
                        | 'ar'
                        | 'az'
                        | 'bg'
                        | 'bn'
                        | 'ca'
                        | 'cs'
                        | 'cy'
                        | 'da'
                        | 'de'
                        | 'el'
                        | 'en'
                        | 'eo'
                        | 'es'
                        | 'et'
                        | 'eu'
                        | 'fa'
                        | 'fi'
                        | 'fo'
                        | 'fr'
                        | 'ga'
                        | 'gl'
                        | 'he'
                        | 'hi'
                        | 'hu'
                        | 'hy'
                        | 'id'
                        | 'is'
                        | 'it'
                        | 'ja'
                        | 'ka'
                        | 'kk'
                        | 'ko'
                        | 'ku'
                        | 'ky'
                        | 'lt'
                        | 'lv'
                        | 'mi'
                        | 'mn'
                        | 'mr'
                        | 'ms'
                        | 'mt'
                        | 'nb'
                        | 'nl'
                        | 'no'
                        | 'ns'
                        | 'pl'
                        | 'ps'
                        | 'pt'
                        | 'pt-br'
                        | 'qu'
                        | 'ro'
                        | 'ru'
                        | 'sk'
                        | 'sq'
                        | 'sv'
                        | 'sw'
                        | 'ta'
                        | 'te'
                        | 'th'
                        | 'tl'
                        | 'tn'
                        | 'tr'
                        | 'tt'
                        | 'uk'
                        | 'ur'
                        | 'uz'
                        | 'zh'
                      )[]
                    | undefined
                  decompoundQuery?: boolean | undefined
                  enableRules?: boolean | undefined
                  enablePersonalization?: boolean | undefined
                  queryType?: 'prefixLast' | 'prefixAll' | 'prefixNone' | undefined
                  removeWordsIfNoResults?:
                    | 'none'
                    | 'lastWords'
                    | 'firstWords'
                    | 'allOptional'
                    | undefined
                  mode?: 'neuralSearch' | 'keywordSearch' | undefined
                  semanticSearch?:
                    | { eventSources?: string[] | ({ [x: string]: unknown } | null) | undefined }
                    | undefined
                  advancedSyntax?: boolean | undefined
                  optionalWords?: string | ({ [x: string]: unknown } | null) | string[] | undefined
                  disableExactOnAttributes?: string[] | undefined
                  exactOnSingleWordQuery?: 'attribute' | 'none' | 'word' | undefined
                  alternativesAsExact?:
                    | (
                        | 'ignorePlurals'
                        | 'singleWordSynonym'
                        | 'multiWordsSynonym'
                        | 'ignoreConjugations'
                      )[]
                    | undefined
                  advancedSyntaxFeatures?: ('exactPhrase' | 'excludeWords')[] | undefined
                  distinct?: boolean | number | undefined
                  replaceSynonymsInHighlight?: boolean | undefined
                  minProximity?: number | undefined
                  responseFields?: string[] | undefined
                  maxValuesPerFacet?: number | undefined
                  sortFacetValuesBy?: string | undefined
                  attributeCriteriaComputedByMinProximity?: boolean | undefined
                  renderingContent?:
                    | {
                        facetOrdering?:
                          | {
                              facets?: { order?: string[] | undefined } | undefined
                              values?:
                                | {
                                    [x: string]: {
                                      order?: string[] | undefined
                                      sortRemainingBy?: 'count' | 'alpha' | 'hidden' | undefined
                                      hide?: string[] | undefined
                                    }
                                  }
                                | undefined
                            }
                          | undefined
                        redirect?: { url?: string | undefined } | undefined
                        widgets?:
                          | {
                              banners?:
                                | {
                                    image?:
                                      | {
                                          urls?: { url?: string | undefined }[] | undefined
                                          title?: string | undefined
                                        }
                                      | undefined
                                    link?: { url?: string | undefined } | undefined
                                  }[]
                                | undefined
                            }
                          | undefined
                      }
                    | undefined
                  enableReRanking?: boolean | undefined
                  reRankingApplyFilter?:
                    | unknown[]
                    | string
                    | ({ [x: string]: unknown } | null)
                    | undefined
                  cursor?: string | undefined
                }
              }
            }
            output: {}
            outputFormat: string
            status: 204
          }
        | {
            input: {
              query: {
                indexName: string
                browseParams: {
                  query?: string | undefined
                  similarQuery?: string | undefined
                  filters?: string | undefined
                  facetFilters?: unknown[] | string | undefined
                  optionalFilters?: unknown[] | string | undefined
                  numericFilters?: unknown[] | string | undefined
                  tagFilters?: unknown[] | string | undefined
                  sumOrFiltersScores?: boolean | undefined
                  restrictSearchableAttributes?: string[] | undefined
                  facets?: string[] | undefined
                  facetingAfterDistinct?: boolean | undefined
                  page?: number | undefined
                  offset?: number | undefined
                  length?: number | undefined
                  aroundLatLng?: string | undefined
                  aroundLatLngViaIP?: boolean | undefined
                  aroundRadius?: number | 'all' | undefined
                  aroundPrecision?:
                    | number
                    | { from?: number | undefined; value?: number | undefined }[]
                    | undefined
                  minimumAroundRadius?: number | undefined
                  insideBoundingBox?:
                    | string
                    | ({ [x: string]: unknown } | null)
                    | number[][]
                    | undefined
                  insidePolygon?: number[][] | undefined
                  naturalLanguages?:
                    | (
                        | 'af'
                        | 'ar'
                        | 'az'
                        | 'bg'
                        | 'bn'
                        | 'ca'
                        | 'cs'
                        | 'cy'
                        | 'da'
                        | 'de'
                        | 'el'
                        | 'en'
                        | 'eo'
                        | 'es'
                        | 'et'
                        | 'eu'
                        | 'fa'
                        | 'fi'
                        | 'fo'
                        | 'fr'
                        | 'ga'
                        | 'gl'
                        | 'he'
                        | 'hi'
                        | 'hu'
                        | 'hy'
                        | 'id'
                        | 'is'
                        | 'it'
                        | 'ja'
                        | 'ka'
                        | 'kk'
                        | 'ko'
                        | 'ku'
                        | 'ky'
                        | 'lt'
                        | 'lv'
                        | 'mi'
                        | 'mn'
                        | 'mr'
                        | 'ms'
                        | 'mt'
                        | 'nb'
                        | 'nl'
                        | 'no'
                        | 'ns'
                        | 'pl'
                        | 'ps'
                        | 'pt'
                        | 'pt-br'
                        | 'qu'
                        | 'ro'
                        | 'ru'
                        | 'sk'
                        | 'sq'
                        | 'sv'
                        | 'sw'
                        | 'ta'
                        | 'te'
                        | 'th'
                        | 'tl'
                        | 'tn'
                        | 'tr'
                        | 'tt'
                        | 'uk'
                        | 'ur'
                        | 'uz'
                        | 'zh'
                      )[]
                    | undefined
                  ruleContexts?: string[] | undefined
                  personalizationImpact?: number | undefined
                  userToken?: string | undefined
                  getRankingInfo?: boolean | undefined
                  synonyms?: boolean | undefined
                  clickAnalytics?: boolean | undefined
                  analytics?: boolean | undefined
                  analyticsTags?: string[] | undefined
                  percentileComputation?: boolean | undefined
                  enableABTest?: boolean | undefined
                  attributesToRetrieve?: string[] | undefined
                  ranking?: string[] | undefined
                  relevancyStrictness?: number | undefined
                  attributesToHighlight?: string[] | undefined
                  attributesToSnippet?: string[] | undefined
                  highlightPreTag?: string | undefined
                  highlightPostTag?: string | undefined
                  snippetEllipsisText?: string | undefined
                  restrictHighlightAndSnippetArrays?: boolean | undefined
                  hitsPerPage?: number | undefined
                  minWordSizefor1Typo?: number | undefined
                  minWordSizefor2Typos?: number | undefined
                  typoTolerance?: boolean | 'min' | 'strict' | 'true' | 'false' | undefined
                  allowTyposOnNumericTokens?: boolean | undefined
                  disableTypoToleranceOnAttributes?: string[] | undefined
                  ignorePlurals?:
                    | (
                        | 'af'
                        | 'ar'
                        | 'az'
                        | 'bg'
                        | 'bn'
                        | 'ca'
                        | 'cs'
                        | 'cy'
                        | 'da'
                        | 'de'
                        | 'el'
                        | 'en'
                        | 'eo'
                        | 'es'
                        | 'et'
                        | 'eu'
                        | 'fa'
                        | 'fi'
                        | 'fo'
                        | 'fr'
                        | 'ga'
                        | 'gl'
                        | 'he'
                        | 'hi'
                        | 'hu'
                        | 'hy'
                        | 'id'
                        | 'is'
                        | 'it'
                        | 'ja'
                        | 'ka'
                        | 'kk'
                        | 'ko'
                        | 'ku'
                        | 'ky'
                        | 'lt'
                        | 'lv'
                        | 'mi'
                        | 'mn'
                        | 'mr'
                        | 'ms'
                        | 'mt'
                        | 'nb'
                        | 'nl'
                        | 'no'
                        | 'ns'
                        | 'pl'
                        | 'ps'
                        | 'pt'
                        | 'pt-br'
                        | 'qu'
                        | 'ro'
                        | 'ru'
                        | 'sk'
                        | 'sq'
                        | 'sv'
                        | 'sw'
                        | 'ta'
                        | 'te'
                        | 'th'
                        | 'tl'
                        | 'tn'
                        | 'tr'
                        | 'tt'
                        | 'uk'
                        | 'ur'
                        | 'uz'
                        | 'zh'
                      )[]
                    | 'true'
                    | 'false'
                    | boolean
                    | undefined
                  removeStopWords?:
                    | (
                        | 'af'
                        | 'ar'
                        | 'az'
                        | 'bg'
                        | 'bn'
                        | 'ca'
                        | 'cs'
                        | 'cy'
                        | 'da'
                        | 'de'
                        | 'el'
                        | 'en'
                        | 'eo'
                        | 'es'
                        | 'et'
                        | 'eu'
                        | 'fa'
                        | 'fi'
                        | 'fo'
                        | 'fr'
                        | 'ga'
                        | 'gl'
                        | 'he'
                        | 'hi'
                        | 'hu'
                        | 'hy'
                        | 'id'
                        | 'is'
                        | 'it'
                        | 'ja'
                        | 'ka'
                        | 'kk'
                        | 'ko'
                        | 'ku'
                        | 'ky'
                        | 'lt'
                        | 'lv'
                        | 'mi'
                        | 'mn'
                        | 'mr'
                        | 'ms'
                        | 'mt'
                        | 'nb'
                        | 'nl'
                        | 'no'
                        | 'ns'
                        | 'pl'
                        | 'ps'
                        | 'pt'
                        | 'pt-br'
                        | 'qu'
                        | 'ro'
                        | 'ru'
                        | 'sk'
                        | 'sq'
                        | 'sv'
                        | 'sw'
                        | 'ta'
                        | 'te'
                        | 'th'
                        | 'tl'
                        | 'tn'
                        | 'tr'
                        | 'tt'
                        | 'uk'
                        | 'ur'
                        | 'uz'
                        | 'zh'
                      )[]
                    | boolean
                    | undefined
                  queryLanguages?:
                    | (
                        | 'af'
                        | 'ar'
                        | 'az'
                        | 'bg'
                        | 'bn'
                        | 'ca'
                        | 'cs'
                        | 'cy'
                        | 'da'
                        | 'de'
                        | 'el'
                        | 'en'
                        | 'eo'
                        | 'es'
                        | 'et'
                        | 'eu'
                        | 'fa'
                        | 'fi'
                        | 'fo'
                        | 'fr'
                        | 'ga'
                        | 'gl'
                        | 'he'
                        | 'hi'
                        | 'hu'
                        | 'hy'
                        | 'id'
                        | 'is'
                        | 'it'
                        | 'ja'
                        | 'ka'
                        | 'kk'
                        | 'ko'
                        | 'ku'
                        | 'ky'
                        | 'lt'
                        | 'lv'
                        | 'mi'
                        | 'mn'
                        | 'mr'
                        | 'ms'
                        | 'mt'
                        | 'nb'
                        | 'nl'
                        | 'no'
                        | 'ns'
                        | 'pl'
                        | 'ps'
                        | 'pt'
                        | 'pt-br'
                        | 'qu'
                        | 'ro'
                        | 'ru'
                        | 'sk'
                        | 'sq'
                        | 'sv'
                        | 'sw'
                        | 'ta'
                        | 'te'
                        | 'th'
                        | 'tl'
                        | 'tn'
                        | 'tr'
                        | 'tt'
                        | 'uk'
                        | 'ur'
                        | 'uz'
                        | 'zh'
                      )[]
                    | undefined
                  decompoundQuery?: boolean | undefined
                  enableRules?: boolean | undefined
                  enablePersonalization?: boolean | undefined
                  queryType?: 'prefixLast' | 'prefixAll' | 'prefixNone' | undefined
                  removeWordsIfNoResults?:
                    | 'none'
                    | 'lastWords'
                    | 'firstWords'
                    | 'allOptional'
                    | undefined
                  mode?: 'neuralSearch' | 'keywordSearch' | undefined
                  semanticSearch?:
                    | { eventSources?: string[] | ({ [x: string]: unknown } | null) | undefined }
                    | undefined
                  advancedSyntax?: boolean | undefined
                  optionalWords?: string | ({ [x: string]: unknown } | null) | string[] | undefined
                  disableExactOnAttributes?: string[] | undefined
                  exactOnSingleWordQuery?: 'attribute' | 'none' | 'word' | undefined
                  alternativesAsExact?:
                    | (
                        | 'ignorePlurals'
                        | 'singleWordSynonym'
                        | 'multiWordsSynonym'
                        | 'ignoreConjugations'
                      )[]
                    | undefined
                  advancedSyntaxFeatures?: ('exactPhrase' | 'excludeWords')[] | undefined
                  distinct?: boolean | number | undefined
                  replaceSynonymsInHighlight?: boolean | undefined
                  minProximity?: number | undefined
                  responseFields?: string[] | undefined
                  maxValuesPerFacet?: number | undefined
                  sortFacetValuesBy?: string | undefined
                  attributeCriteriaComputedByMinProximity?: boolean | undefined
                  renderingContent?:
                    | {
                        facetOrdering?:
                          | {
                              facets?: { order?: string[] | undefined } | undefined
                              values?:
                                | {
                                    [x: string]: {
                                      order?: string[] | undefined
                                      sortRemainingBy?: 'count' | 'alpha' | 'hidden' | undefined
                                      hide?: string[] | undefined
                                    }
                                  }
                                | undefined
                            }
                          | undefined
                        redirect?: { url?: string | undefined } | undefined
                        widgets?:
                          | {
                              banners?:
                                | {
                                    image?:
                                      | {
                                          urls?: { url?: string | undefined }[] | undefined
                                          title?: string | undefined
                                        }
                                      | undefined
                                    link?: { url?: string | undefined } | undefined
                                  }[]
                                | undefined
                            }
                          | undefined
                      }
                    | undefined
                  enableReRanking?: boolean | undefined
                  reRankingApplyFilter?:
                    | unknown[]
                    | string
                    | ({ [x: string]: unknown } | null)
                    | undefined
                  cursor?: string | undefined
                }
              }
            }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 400
          }
    }
  } & {
    '/generateSecuredApiKey': {
      $get:
        | {
            input: {
              query: {
                parentApiKey: string
                restrictions: {
                  searchParams?:
                    | {
                        query?: string | undefined
                        similarQuery?: string | undefined
                        filters?: string | undefined
                        facetFilters?: unknown[] | string | undefined
                        optionalFilters?: unknown[] | string | undefined
                        numericFilters?: unknown[] | string | undefined
                        tagFilters?: unknown[] | string | undefined
                        sumOrFiltersScores?: boolean | undefined
                        restrictSearchableAttributes?: string[] | undefined
                        facets?: string[] | undefined
                        facetingAfterDistinct?: boolean | undefined
                        page?: number | undefined
                        offset?: number | undefined
                        length?: number | undefined
                        aroundLatLng?: string | undefined
                        aroundLatLngViaIP?: boolean | undefined
                        aroundRadius?: number | 'all' | undefined
                        aroundPrecision?:
                          | number
                          | { from?: number | undefined; value?: number | undefined }[]
                          | undefined
                        minimumAroundRadius?: number | undefined
                        insideBoundingBox?:
                          | string
                          | ({ [x: string]: unknown } | null)
                          | number[][]
                          | undefined
                        insidePolygon?: number[][] | undefined
                        naturalLanguages?:
                          | (
                              | 'af'
                              | 'ar'
                              | 'az'
                              | 'bg'
                              | 'bn'
                              | 'ca'
                              | 'cs'
                              | 'cy'
                              | 'da'
                              | 'de'
                              | 'el'
                              | 'en'
                              | 'eo'
                              | 'es'
                              | 'et'
                              | 'eu'
                              | 'fa'
                              | 'fi'
                              | 'fo'
                              | 'fr'
                              | 'ga'
                              | 'gl'
                              | 'he'
                              | 'hi'
                              | 'hu'
                              | 'hy'
                              | 'id'
                              | 'is'
                              | 'it'
                              | 'ja'
                              | 'ka'
                              | 'kk'
                              | 'ko'
                              | 'ku'
                              | 'ky'
                              | 'lt'
                              | 'lv'
                              | 'mi'
                              | 'mn'
                              | 'mr'
                              | 'ms'
                              | 'mt'
                              | 'nb'
                              | 'nl'
                              | 'no'
                              | 'ns'
                              | 'pl'
                              | 'ps'
                              | 'pt'
                              | 'pt-br'
                              | 'qu'
                              | 'ro'
                              | 'ru'
                              | 'sk'
                              | 'sq'
                              | 'sv'
                              | 'sw'
                              | 'ta'
                              | 'te'
                              | 'th'
                              | 'tl'
                              | 'tn'
                              | 'tr'
                              | 'tt'
                              | 'uk'
                              | 'ur'
                              | 'uz'
                              | 'zh'
                            )[]
                          | undefined
                        ruleContexts?: string[] | undefined
                        personalizationImpact?: number | undefined
                        userToken?: string | undefined
                        getRankingInfo?: boolean | undefined
                        synonyms?: boolean | undefined
                        clickAnalytics?: boolean | undefined
                        analytics?: boolean | undefined
                        analyticsTags?: string[] | undefined
                        percentileComputation?: boolean | undefined
                        enableABTest?: boolean | undefined
                        attributesToRetrieve?: string[] | undefined
                        ranking?: string[] | undefined
                        relevancyStrictness?: number | undefined
                        attributesToHighlight?: string[] | undefined
                        attributesToSnippet?: string[] | undefined
                        highlightPreTag?: string | undefined
                        highlightPostTag?: string | undefined
                        snippetEllipsisText?: string | undefined
                        restrictHighlightAndSnippetArrays?: boolean | undefined
                        hitsPerPage?: number | undefined
                        minWordSizefor1Typo?: number | undefined
                        minWordSizefor2Typos?: number | undefined
                        typoTolerance?: boolean | 'min' | 'strict' | 'true' | 'false' | undefined
                        allowTyposOnNumericTokens?: boolean | undefined
                        disableTypoToleranceOnAttributes?: string[] | undefined
                        ignorePlurals?:
                          | (
                              | 'af'
                              | 'ar'
                              | 'az'
                              | 'bg'
                              | 'bn'
                              | 'ca'
                              | 'cs'
                              | 'cy'
                              | 'da'
                              | 'de'
                              | 'el'
                              | 'en'
                              | 'eo'
                              | 'es'
                              | 'et'
                              | 'eu'
                              | 'fa'
                              | 'fi'
                              | 'fo'
                              | 'fr'
                              | 'ga'
                              | 'gl'
                              | 'he'
                              | 'hi'
                              | 'hu'
                              | 'hy'
                              | 'id'
                              | 'is'
                              | 'it'
                              | 'ja'
                              | 'ka'
                              | 'kk'
                              | 'ko'
                              | 'ku'
                              | 'ky'
                              | 'lt'
                              | 'lv'
                              | 'mi'
                              | 'mn'
                              | 'mr'
                              | 'ms'
                              | 'mt'
                              | 'nb'
                              | 'nl'
                              | 'no'
                              | 'ns'
                              | 'pl'
                              | 'ps'
                              | 'pt'
                              | 'pt-br'
                              | 'qu'
                              | 'ro'
                              | 'ru'
                              | 'sk'
                              | 'sq'
                              | 'sv'
                              | 'sw'
                              | 'ta'
                              | 'te'
                              | 'th'
                              | 'tl'
                              | 'tn'
                              | 'tr'
                              | 'tt'
                              | 'uk'
                              | 'ur'
                              | 'uz'
                              | 'zh'
                            )[]
                          | 'true'
                          | 'false'
                          | boolean
                          | undefined
                        removeStopWords?:
                          | (
                              | 'af'
                              | 'ar'
                              | 'az'
                              | 'bg'
                              | 'bn'
                              | 'ca'
                              | 'cs'
                              | 'cy'
                              | 'da'
                              | 'de'
                              | 'el'
                              | 'en'
                              | 'eo'
                              | 'es'
                              | 'et'
                              | 'eu'
                              | 'fa'
                              | 'fi'
                              | 'fo'
                              | 'fr'
                              | 'ga'
                              | 'gl'
                              | 'he'
                              | 'hi'
                              | 'hu'
                              | 'hy'
                              | 'id'
                              | 'is'
                              | 'it'
                              | 'ja'
                              | 'ka'
                              | 'kk'
                              | 'ko'
                              | 'ku'
                              | 'ky'
                              | 'lt'
                              | 'lv'
                              | 'mi'
                              | 'mn'
                              | 'mr'
                              | 'ms'
                              | 'mt'
                              | 'nb'
                              | 'nl'
                              | 'no'
                              | 'ns'
                              | 'pl'
                              | 'ps'
                              | 'pt'
                              | 'pt-br'
                              | 'qu'
                              | 'ro'
                              | 'ru'
                              | 'sk'
                              | 'sq'
                              | 'sv'
                              | 'sw'
                              | 'ta'
                              | 'te'
                              | 'th'
                              | 'tl'
                              | 'tn'
                              | 'tr'
                              | 'tt'
                              | 'uk'
                              | 'ur'
                              | 'uz'
                              | 'zh'
                            )[]
                          | boolean
                          | undefined
                        queryLanguages?:
                          | (
                              | 'af'
                              | 'ar'
                              | 'az'
                              | 'bg'
                              | 'bn'
                              | 'ca'
                              | 'cs'
                              | 'cy'
                              | 'da'
                              | 'de'
                              | 'el'
                              | 'en'
                              | 'eo'
                              | 'es'
                              | 'et'
                              | 'eu'
                              | 'fa'
                              | 'fi'
                              | 'fo'
                              | 'fr'
                              | 'ga'
                              | 'gl'
                              | 'he'
                              | 'hi'
                              | 'hu'
                              | 'hy'
                              | 'id'
                              | 'is'
                              | 'it'
                              | 'ja'
                              | 'ka'
                              | 'kk'
                              | 'ko'
                              | 'ku'
                              | 'ky'
                              | 'lt'
                              | 'lv'
                              | 'mi'
                              | 'mn'
                              | 'mr'
                              | 'ms'
                              | 'mt'
                              | 'nb'
                              | 'nl'
                              | 'no'
                              | 'ns'
                              | 'pl'
                              | 'ps'
                              | 'pt'
                              | 'pt-br'
                              | 'qu'
                              | 'ro'
                              | 'ru'
                              | 'sk'
                              | 'sq'
                              | 'sv'
                              | 'sw'
                              | 'ta'
                              | 'te'
                              | 'th'
                              | 'tl'
                              | 'tn'
                              | 'tr'
                              | 'tt'
                              | 'uk'
                              | 'ur'
                              | 'uz'
                              | 'zh'
                            )[]
                          | undefined
                        decompoundQuery?: boolean | undefined
                        enableRules?: boolean | undefined
                        enablePersonalization?: boolean | undefined
                        queryType?: 'prefixLast' | 'prefixAll' | 'prefixNone' | undefined
                        removeWordsIfNoResults?:
                          | 'none'
                          | 'lastWords'
                          | 'firstWords'
                          | 'allOptional'
                          | undefined
                        mode?: 'neuralSearch' | 'keywordSearch' | undefined
                        semanticSearch?:
                          | {
                              eventSources?:
                                | string[]
                                | ({ [x: string]: unknown } | null)
                                | undefined
                            }
                          | undefined
                        advancedSyntax?: boolean | undefined
                        optionalWords?:
                          | string
                          | ({ [x: string]: unknown } | null)
                          | string[]
                          | undefined
                        disableExactOnAttributes?: string[] | undefined
                        exactOnSingleWordQuery?: 'attribute' | 'none' | 'word' | undefined
                        alternativesAsExact?:
                          | (
                              | 'ignorePlurals'
                              | 'singleWordSynonym'
                              | 'multiWordsSynonym'
                              | 'ignoreConjugations'
                            )[]
                          | undefined
                        advancedSyntaxFeatures?: ('exactPhrase' | 'excludeWords')[] | undefined
                        distinct?: boolean | number | undefined
                        replaceSynonymsInHighlight?: boolean | undefined
                        minProximity?: number | undefined
                        responseFields?: string[] | undefined
                        maxValuesPerFacet?: number | undefined
                        sortFacetValuesBy?: string | undefined
                        attributeCriteriaComputedByMinProximity?: boolean | undefined
                        renderingContent?:
                          | {
                              facetOrdering?:
                                | {
                                    facets?: { order?: string[] | undefined } | undefined
                                    values?:
                                      | {
                                          [x: string]: {
                                            order?: string[] | undefined
                                            sortRemainingBy?:
                                              | 'count'
                                              | 'alpha'
                                              | 'hidden'
                                              | undefined
                                            hide?: string[] | undefined
                                          }
                                        }
                                      | undefined
                                  }
                                | undefined
                              redirect?: { url?: string | undefined } | undefined
                              widgets?:
                                | {
                                    banners?:
                                      | {
                                          image?:
                                            | {
                                                urls?: { url?: string | undefined }[] | undefined
                                                title?: string | undefined
                                              }
                                            | undefined
                                          link?: { url?: string | undefined } | undefined
                                        }[]
                                      | undefined
                                  }
                                | undefined
                            }
                          | undefined
                        enableReRanking?: boolean | undefined
                        reRankingApplyFilter?:
                          | unknown[]
                          | string
                          | ({ [x: string]: unknown } | null)
                          | undefined
                      }
                    | undefined
                  filters?: string | undefined
                  validUntil?: bigint | undefined
                  restrictIndices?: string[] | undefined
                  restrictSources?: string | undefined
                  userToken?: string | undefined
                }
              }
            }
            output: string
            outputFormat: 'json'
            status: 200
          }
        | {
            input: {
              query: {
                parentApiKey: string
                restrictions: {
                  searchParams?:
                    | {
                        query?: string | undefined
                        similarQuery?: string | undefined
                        filters?: string | undefined
                        facetFilters?: unknown[] | string | undefined
                        optionalFilters?: unknown[] | string | undefined
                        numericFilters?: unknown[] | string | undefined
                        tagFilters?: unknown[] | string | undefined
                        sumOrFiltersScores?: boolean | undefined
                        restrictSearchableAttributes?: string[] | undefined
                        facets?: string[] | undefined
                        facetingAfterDistinct?: boolean | undefined
                        page?: number | undefined
                        offset?: number | undefined
                        length?: number | undefined
                        aroundLatLng?: string | undefined
                        aroundLatLngViaIP?: boolean | undefined
                        aroundRadius?: number | 'all' | undefined
                        aroundPrecision?:
                          | number
                          | { from?: number | undefined; value?: number | undefined }[]
                          | undefined
                        minimumAroundRadius?: number | undefined
                        insideBoundingBox?:
                          | string
                          | ({ [x: string]: unknown } | null)
                          | number[][]
                          | undefined
                        insidePolygon?: number[][] | undefined
                        naturalLanguages?:
                          | (
                              | 'af'
                              | 'ar'
                              | 'az'
                              | 'bg'
                              | 'bn'
                              | 'ca'
                              | 'cs'
                              | 'cy'
                              | 'da'
                              | 'de'
                              | 'el'
                              | 'en'
                              | 'eo'
                              | 'es'
                              | 'et'
                              | 'eu'
                              | 'fa'
                              | 'fi'
                              | 'fo'
                              | 'fr'
                              | 'ga'
                              | 'gl'
                              | 'he'
                              | 'hi'
                              | 'hu'
                              | 'hy'
                              | 'id'
                              | 'is'
                              | 'it'
                              | 'ja'
                              | 'ka'
                              | 'kk'
                              | 'ko'
                              | 'ku'
                              | 'ky'
                              | 'lt'
                              | 'lv'
                              | 'mi'
                              | 'mn'
                              | 'mr'
                              | 'ms'
                              | 'mt'
                              | 'nb'
                              | 'nl'
                              | 'no'
                              | 'ns'
                              | 'pl'
                              | 'ps'
                              | 'pt'
                              | 'pt-br'
                              | 'qu'
                              | 'ro'
                              | 'ru'
                              | 'sk'
                              | 'sq'
                              | 'sv'
                              | 'sw'
                              | 'ta'
                              | 'te'
                              | 'th'
                              | 'tl'
                              | 'tn'
                              | 'tr'
                              | 'tt'
                              | 'uk'
                              | 'ur'
                              | 'uz'
                              | 'zh'
                            )[]
                          | undefined
                        ruleContexts?: string[] | undefined
                        personalizationImpact?: number | undefined
                        userToken?: string | undefined
                        getRankingInfo?: boolean | undefined
                        synonyms?: boolean | undefined
                        clickAnalytics?: boolean | undefined
                        analytics?: boolean | undefined
                        analyticsTags?: string[] | undefined
                        percentileComputation?: boolean | undefined
                        enableABTest?: boolean | undefined
                        attributesToRetrieve?: string[] | undefined
                        ranking?: string[] | undefined
                        relevancyStrictness?: number | undefined
                        attributesToHighlight?: string[] | undefined
                        attributesToSnippet?: string[] | undefined
                        highlightPreTag?: string | undefined
                        highlightPostTag?: string | undefined
                        snippetEllipsisText?: string | undefined
                        restrictHighlightAndSnippetArrays?: boolean | undefined
                        hitsPerPage?: number | undefined
                        minWordSizefor1Typo?: number | undefined
                        minWordSizefor2Typos?: number | undefined
                        typoTolerance?: boolean | 'min' | 'strict' | 'true' | 'false' | undefined
                        allowTyposOnNumericTokens?: boolean | undefined
                        disableTypoToleranceOnAttributes?: string[] | undefined
                        ignorePlurals?:
                          | (
                              | 'af'
                              | 'ar'
                              | 'az'
                              | 'bg'
                              | 'bn'
                              | 'ca'
                              | 'cs'
                              | 'cy'
                              | 'da'
                              | 'de'
                              | 'el'
                              | 'en'
                              | 'eo'
                              | 'es'
                              | 'et'
                              | 'eu'
                              | 'fa'
                              | 'fi'
                              | 'fo'
                              | 'fr'
                              | 'ga'
                              | 'gl'
                              | 'he'
                              | 'hi'
                              | 'hu'
                              | 'hy'
                              | 'id'
                              | 'is'
                              | 'it'
                              | 'ja'
                              | 'ka'
                              | 'kk'
                              | 'ko'
                              | 'ku'
                              | 'ky'
                              | 'lt'
                              | 'lv'
                              | 'mi'
                              | 'mn'
                              | 'mr'
                              | 'ms'
                              | 'mt'
                              | 'nb'
                              | 'nl'
                              | 'no'
                              | 'ns'
                              | 'pl'
                              | 'ps'
                              | 'pt'
                              | 'pt-br'
                              | 'qu'
                              | 'ro'
                              | 'ru'
                              | 'sk'
                              | 'sq'
                              | 'sv'
                              | 'sw'
                              | 'ta'
                              | 'te'
                              | 'th'
                              | 'tl'
                              | 'tn'
                              | 'tr'
                              | 'tt'
                              | 'uk'
                              | 'ur'
                              | 'uz'
                              | 'zh'
                            )[]
                          | 'true'
                          | 'false'
                          | boolean
                          | undefined
                        removeStopWords?:
                          | (
                              | 'af'
                              | 'ar'
                              | 'az'
                              | 'bg'
                              | 'bn'
                              | 'ca'
                              | 'cs'
                              | 'cy'
                              | 'da'
                              | 'de'
                              | 'el'
                              | 'en'
                              | 'eo'
                              | 'es'
                              | 'et'
                              | 'eu'
                              | 'fa'
                              | 'fi'
                              | 'fo'
                              | 'fr'
                              | 'ga'
                              | 'gl'
                              | 'he'
                              | 'hi'
                              | 'hu'
                              | 'hy'
                              | 'id'
                              | 'is'
                              | 'it'
                              | 'ja'
                              | 'ka'
                              | 'kk'
                              | 'ko'
                              | 'ku'
                              | 'ky'
                              | 'lt'
                              | 'lv'
                              | 'mi'
                              | 'mn'
                              | 'mr'
                              | 'ms'
                              | 'mt'
                              | 'nb'
                              | 'nl'
                              | 'no'
                              | 'ns'
                              | 'pl'
                              | 'ps'
                              | 'pt'
                              | 'pt-br'
                              | 'qu'
                              | 'ro'
                              | 'ru'
                              | 'sk'
                              | 'sq'
                              | 'sv'
                              | 'sw'
                              | 'ta'
                              | 'te'
                              | 'th'
                              | 'tl'
                              | 'tn'
                              | 'tr'
                              | 'tt'
                              | 'uk'
                              | 'ur'
                              | 'uz'
                              | 'zh'
                            )[]
                          | boolean
                          | undefined
                        queryLanguages?:
                          | (
                              | 'af'
                              | 'ar'
                              | 'az'
                              | 'bg'
                              | 'bn'
                              | 'ca'
                              | 'cs'
                              | 'cy'
                              | 'da'
                              | 'de'
                              | 'el'
                              | 'en'
                              | 'eo'
                              | 'es'
                              | 'et'
                              | 'eu'
                              | 'fa'
                              | 'fi'
                              | 'fo'
                              | 'fr'
                              | 'ga'
                              | 'gl'
                              | 'he'
                              | 'hi'
                              | 'hu'
                              | 'hy'
                              | 'id'
                              | 'is'
                              | 'it'
                              | 'ja'
                              | 'ka'
                              | 'kk'
                              | 'ko'
                              | 'ku'
                              | 'ky'
                              | 'lt'
                              | 'lv'
                              | 'mi'
                              | 'mn'
                              | 'mr'
                              | 'ms'
                              | 'mt'
                              | 'nb'
                              | 'nl'
                              | 'no'
                              | 'ns'
                              | 'pl'
                              | 'ps'
                              | 'pt'
                              | 'pt-br'
                              | 'qu'
                              | 'ro'
                              | 'ru'
                              | 'sk'
                              | 'sq'
                              | 'sv'
                              | 'sw'
                              | 'ta'
                              | 'te'
                              | 'th'
                              | 'tl'
                              | 'tn'
                              | 'tr'
                              | 'tt'
                              | 'uk'
                              | 'ur'
                              | 'uz'
                              | 'zh'
                            )[]
                          | undefined
                        decompoundQuery?: boolean | undefined
                        enableRules?: boolean | undefined
                        enablePersonalization?: boolean | undefined
                        queryType?: 'prefixLast' | 'prefixAll' | 'prefixNone' | undefined
                        removeWordsIfNoResults?:
                          | 'none'
                          | 'lastWords'
                          | 'firstWords'
                          | 'allOptional'
                          | undefined
                        mode?: 'neuralSearch' | 'keywordSearch' | undefined
                        semanticSearch?:
                          | {
                              eventSources?:
                                | string[]
                                | ({ [x: string]: unknown } | null)
                                | undefined
                            }
                          | undefined
                        advancedSyntax?: boolean | undefined
                        optionalWords?:
                          | string
                          | ({ [x: string]: unknown } | null)
                          | string[]
                          | undefined
                        disableExactOnAttributes?: string[] | undefined
                        exactOnSingleWordQuery?: 'attribute' | 'none' | 'word' | undefined
                        alternativesAsExact?:
                          | (
                              | 'ignorePlurals'
                              | 'singleWordSynonym'
                              | 'multiWordsSynonym'
                              | 'ignoreConjugations'
                            )[]
                          | undefined
                        advancedSyntaxFeatures?: ('exactPhrase' | 'excludeWords')[] | undefined
                        distinct?: boolean | number | undefined
                        replaceSynonymsInHighlight?: boolean | undefined
                        minProximity?: number | undefined
                        responseFields?: string[] | undefined
                        maxValuesPerFacet?: number | undefined
                        sortFacetValuesBy?: string | undefined
                        attributeCriteriaComputedByMinProximity?: boolean | undefined
                        renderingContent?:
                          | {
                              facetOrdering?:
                                | {
                                    facets?: { order?: string[] | undefined } | undefined
                                    values?:
                                      | {
                                          [x: string]: {
                                            order?: string[] | undefined
                                            sortRemainingBy?:
                                              | 'count'
                                              | 'alpha'
                                              | 'hidden'
                                              | undefined
                                            hide?: string[] | undefined
                                          }
                                        }
                                      | undefined
                                  }
                                | undefined
                              redirect?: { url?: string | undefined } | undefined
                              widgets?:
                                | {
                                    banners?:
                                      | {
                                          image?:
                                            | {
                                                urls?: { url?: string | undefined }[] | undefined
                                                title?: string | undefined
                                              }
                                            | undefined
                                          link?: { url?: string | undefined } | undefined
                                        }[]
                                      | undefined
                                  }
                                | undefined
                            }
                          | undefined
                        enableReRanking?: boolean | undefined
                        reRankingApplyFilter?:
                          | unknown[]
                          | string
                          | ({ [x: string]: unknown } | null)
                          | undefined
                      }
                    | undefined
                  filters?: string | undefined
                  validUntil?: bigint | undefined
                  restrictIndices?: string[] | undefined
                  restrictSources?: string | undefined
                  userToken?: string | undefined
                }
              }
            }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 400
          }
    }
  } & {
    '/accountCopyIndex': {
      $get:
        | {
            input: {
              query: {
                sourceIndexName: string
                destinationAppID: string
                destinationApiKey: string
                destinationIndexName: string
                batchSize?: number | undefined
              }
            }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 400
          }
        | {
            input: {
              query: {
                sourceIndexName: string
                destinationAppID: string
                destinationApiKey: string
                destinationIndexName: string
                batchSize?: number | undefined
              }
            }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 403
          }
        | {
            input: {
              query: {
                sourceIndexName: string
                destinationAppID: string
                destinationApiKey: string
                destinationIndexName: string
                batchSize?: number | undefined
              }
            }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 404
          }
    }
  } & {
    '/replaceAllObjects': {
      $get:
        | {
            input: {
              query: {
                indexName: string
                objects: { [x: string]: unknown }[]
                batchSize?: number | undefined
                scopes?: ('settings' | 'synonyms' | 'rules')[] | undefined
              }
            }
            output: {
              copyOperationResponse: { taskID: bigint; updatedAt: string }
              batchResponses: { taskID: bigint; objectIDs: string[] }[]
              moveOperationResponse: { taskID: bigint; updatedAt: string }
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: {
              query: {
                indexName: string
                objects: { [x: string]: unknown }[]
                batchSize?: number | undefined
                scopes?: ('settings' | 'synonyms' | 'rules')[] | undefined
              }
            }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 400
          }
    }
  } & {
    '/replaceAllObjectsWithTransformation': {
      $get:
        | {
            input: {
              query: {
                indexName: string
                objects: { [x: string]: unknown }[]
                batchSize?: number | undefined
                scopes?: ('settings' | 'synonyms' | 'rules')[] | undefined
              }
            }
            output: {
              copyOperationResponse: { taskID: bigint; updatedAt: string }
              watchResponses: {
                runID: string
                eventID?: string | undefined
                data?: { [x: string]: unknown }[] | undefined
                events?:
                  | {
                      eventID: string
                      runID: string
                      status:
                        | 'created'
                        | 'started'
                        | 'retried'
                        | 'failed'
                        | 'succeeded'
                        | 'critical'
                        | ({ [x: string]: unknown } | null)
                      type: 'fetch' | 'record' | 'log' | 'transform'
                      batchSize: number
                      data?:
                        | { [x: string]: unknown }
                        | ({ [x: string]: unknown } | null)
                        | undefined
                      publishedAt: string
                    }[]
                  | undefined
                message?: string | undefined
                createdAt?: string | undefined
              }[]
              moveOperationResponse: { taskID: bigint; updatedAt: string }
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: {
              query: {
                indexName: string
                objects: { [x: string]: unknown }[]
                batchSize?: number | undefined
                scopes?: ('settings' | 'synonyms' | 'rules')[] | undefined
              }
            }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 400
          }
    }
  } & {
    '/chunkedBatch': {
      $get:
        | {
            input: {
              query: {
                indexName: string
                objects: { [x: string]: unknown }[]
                action?:
                  | 'addObject'
                  | 'updateObject'
                  | 'partialUpdateObject'
                  | 'partialUpdateObjectNoCreate'
                  | 'deleteObject'
                  | 'delete'
                  | 'clear'
                  | undefined
                waitForTasks?: boolean | undefined
                batchSize?: number | undefined
              }
            }
            output: { taskID: bigint; objectIDs: string[] }[]
            outputFormat: 'json'
            status: 200
          }
        | {
            input: {
              query: {
                indexName: string
                objects: { [x: string]: unknown }[]
                action?:
                  | 'addObject'
                  | 'updateObject'
                  | 'partialUpdateObject'
                  | 'partialUpdateObjectNoCreate'
                  | 'deleteObject'
                  | 'delete'
                  | 'clear'
                  | undefined
                waitForTasks?: boolean | undefined
                batchSize?: number | undefined
              }
            }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 400
          }
    }
  } & {
    '/saveObjects': {
      $get:
        | {
            input: {
              query: {
                indexName: string
                objects: { [x: string]: unknown }[]
                waitForTasks?: boolean | undefined
                batchSize?: number | undefined
                requestOptions?: { [x: string]: unknown } | undefined
              }
            }
            output: { taskID: bigint; objectIDs: string[] }[]
            outputFormat: 'json'
            status: 200
          }
        | {
            input: {
              query: {
                indexName: string
                objects: { [x: string]: unknown }[]
                waitForTasks?: boolean | undefined
                batchSize?: number | undefined
                requestOptions?: { [x: string]: unknown } | undefined
              }
            }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 400
          }
    }
  } & {
    '/saveObjectsWithTransformation': {
      $get:
        | {
            input: {
              query: {
                indexName: string
                objects: { [x: string]: unknown }[]
                waitForTasks?: boolean | undefined
                batchSize?: number | undefined
                requestOptions?: { [x: string]: unknown } | undefined
              }
            }
            output: {
              runID: string
              eventID?: string | undefined
              data?: { [x: string]: unknown }[] | undefined
              events?:
                | {
                    eventID: string
                    runID: string
                    status:
                      | 'created'
                      | 'started'
                      | 'retried'
                      | 'failed'
                      | 'succeeded'
                      | 'critical'
                      | ({ [x: string]: unknown } | null)
                    type: 'fetch' | 'record' | 'log' | 'transform'
                    batchSize: number
                    data?: { [x: string]: unknown } | ({ [x: string]: unknown } | null) | undefined
                    publishedAt: string
                  }[]
                | undefined
              message?: string | undefined
              createdAt?: string | undefined
            }[]
            outputFormat: 'json'
            status: 200
          }
        | {
            input: {
              query: {
                indexName: string
                objects: { [x: string]: unknown }[]
                waitForTasks?: boolean | undefined
                batchSize?: number | undefined
                requestOptions?: { [x: string]: unknown } | undefined
              }
            }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 400
          }
    }
  } & {
    '/deleteObjects': {
      $post:
        | {
            input: {
              query: {
                indexName: string
                objectIDs: string[]
                waitForTasks?: boolean | undefined
                batchSize?: number | undefined
                requestOptions?: { [x: string]: unknown } | undefined
              }
            }
            output: { taskID: bigint; objectIDs: string[] }[]
            outputFormat: 'json'
            status: 200
          }
        | {
            input: {
              query: {
                indexName: string
                objectIDs: string[]
                waitForTasks?: boolean | undefined
                batchSize?: number | undefined
                requestOptions?: { [x: string]: unknown } | undefined
              }
            }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 400
          }
    }
  } & {
    '/partialUpdateObjects': {
      $post:
        | {
            input: {
              query: {
                indexName: string
                objects: { [x: string]: unknown }[]
                createIfNotExists?: boolean | undefined
                waitForTasks?: boolean | undefined
                batchSize?: number | undefined
                requestOptions?: { [x: string]: unknown } | undefined
              }
            }
            output: { taskID: bigint; objectIDs: string[] }[]
            outputFormat: 'json'
            status: 200
          }
        | {
            input: {
              query: {
                indexName: string
                objects: { [x: string]: unknown }[]
                createIfNotExists?: boolean | undefined
                waitForTasks?: boolean | undefined
                batchSize?: number | undefined
                requestOptions?: { [x: string]: unknown } | undefined
              }
            }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 400
          }
    }
  } & {
    '/partialUpdateObjectsWithTransformation': {
      $post:
        | {
            input: {
              query: {
                indexName: string
                objects: { [x: string]: unknown }[]
                createIfNotExists?: boolean | undefined
                waitForTasks?: boolean | undefined
                batchSize?: number | undefined
                requestOptions?: { [x: string]: unknown } | undefined
              }
            }
            output: {
              runID: string
              eventID?: string | undefined
              data?: { [x: string]: unknown }[] | undefined
              events?:
                | {
                    eventID: string
                    runID: string
                    status:
                      | 'created'
                      | 'started'
                      | 'retried'
                      | 'failed'
                      | 'succeeded'
                      | 'critical'
                      | ({ [x: string]: unknown } | null)
                    type: 'fetch' | 'record' | 'log' | 'transform'
                    batchSize: number
                    data?: { [x: string]: unknown } | ({ [x: string]: unknown } | null) | undefined
                    publishedAt: string
                  }[]
                | undefined
              message?: string | undefined
              createdAt?: string | undefined
            }[]
            outputFormat: 'json'
            status: 200
          }
        | {
            input: {
              query: {
                indexName: string
                objects: { [x: string]: unknown }[]
                createIfNotExists?: boolean | undefined
                waitForTasks?: boolean | undefined
                batchSize?: number | undefined
                requestOptions?: { [x: string]: unknown } | undefined
              }
            }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 400
          }
    }
  } & {
    '/indexExists': {
      $get: {
        input: { query: { indexName: string } }
        output: boolean
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/setClientApiKey': {
      $get: { input: { query: { apiKey: string } }; output: {}; outputFormat: string; status: 204 }
    }
  },
  '/'
>
export default routes
