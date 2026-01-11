declare const routes: import(
  '/workspaces/hono-takibi/node_modules/.pnpm/@hono+zod-openapi@1.2.0_hono@4.11.3_zod@4.3.5/node_modules/@hono/zod-openapi/dist/index',
  { with: { 'resolution-mode': 'import' } }
).OpenAPIHono<
  import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/types').Env,
  {
    '/settings/account': {
      $get:
        | {
            input: {}
            output: {
              username?: string | undefined
              email?: string | undefined
              phone?: string | undefined
              language?: string | undefined
              timezone?: string | undefined
              country?: string | undefined
              twoFactorEnabled?: boolean | undefined
              emailVerified?: boolean | undefined
              phoneVerified?: boolean | undefined
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: {}
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
    }
  } & {
    '/settings/account': {
      $put:
        | {
            input: {
              json: {
                language?: string | undefined
                timezone?: string | undefined
                country?: string | undefined
              }
            }
            output: {
              username?: string | undefined
              email?: string | undefined
              phone?: string | undefined
              language?: string | undefined
              timezone?: string | undefined
              country?: string | undefined
              twoFactorEnabled?: boolean | undefined
              emailVerified?: boolean | undefined
              phoneVerified?: boolean | undefined
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: {
              json: {
                language?: string | undefined
                timezone?: string | undefined
                country?: string | undefined
              }
            }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
    }
  } & {
    '/settings/username/check': {
      $get: {
        input: { query: { username: string } }
        output: { available?: boolean | undefined; reason?: string | undefined }
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/settings/privacy': {
      $get:
        | {
            input: {}
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: {}
            output: {
              protectedPosts?: boolean | undefined
              allowTagging?: 'everyone' | 'followers' | 'none' | undefined
              allowMentions?: 'everyone' | 'followers' | 'none' | undefined
              discoverableByEmail?: boolean | undefined
              discoverableByPhone?: boolean | undefined
              showLocation?: boolean | undefined
              personalizeAds?: boolean | undefined
              allowDataSharing?: boolean | undefined
            }
            outputFormat: 'json'
            status: 200
          }
    }
  } & {
    '/settings/privacy': {
      $put:
        | {
            input: {
              json: {
                protectedPosts?: boolean | undefined
                allowTagging?: 'everyone' | 'followers' | 'none' | undefined
                allowMentions?: 'everyone' | 'followers' | 'none' | undefined
                discoverableByEmail?: boolean | undefined
                discoverableByPhone?: boolean | undefined
                showLocation?: boolean | undefined
                personalizeAds?: boolean | undefined
                allowDataSharing?: boolean | undefined
              }
            }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: {
              json: {
                protectedPosts?: boolean | undefined
                allowTagging?: 'everyone' | 'followers' | 'none' | undefined
                allowMentions?: 'everyone' | 'followers' | 'none' | undefined
                discoverableByEmail?: boolean | undefined
                discoverableByPhone?: boolean | undefined
                showLocation?: boolean | undefined
                personalizeAds?: boolean | undefined
                allowDataSharing?: boolean | undefined
              }
            }
            output: {
              protectedPosts?: boolean | undefined
              allowTagging?: 'everyone' | 'followers' | 'none' | undefined
              allowMentions?: 'everyone' | 'followers' | 'none' | undefined
              discoverableByEmail?: boolean | undefined
              discoverableByPhone?: boolean | undefined
              showLocation?: boolean | undefined
              personalizeAds?: boolean | undefined
              allowDataSharing?: boolean | undefined
            }
            outputFormat: 'json'
            status: 200
          }
    }
  } & {
    '/settings/content-preferences': {
      $get:
        | {
            input: {}
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: {}
            output: {
              sensitiveContentFilter?: 'hide' | 'warn' | 'show' | undefined
              autoplayVideos?: 'never' | 'always' | 'wifi' | undefined
              dataUsage?: 'default' | 'reduced' | undefined
              qualityFilter?: boolean | undefined
              hideViewCounts?: boolean | undefined
              hideLikeCounts?: boolean | undefined
            }
            outputFormat: 'json'
            status: 200
          }
    }
  } & {
    '/settings/content-preferences': {
      $put:
        | {
            input: {
              json: {
                sensitiveContentFilter?: 'hide' | 'warn' | 'show' | undefined
                autoplayVideos?: 'never' | 'always' | 'wifi' | undefined
                dataUsage?: 'default' | 'reduced' | undefined
                qualityFilter?: boolean | undefined
                hideViewCounts?: boolean | undefined
                hideLikeCounts?: boolean | undefined
              }
            }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: {
              json: {
                sensitiveContentFilter?: 'hide' | 'warn' | 'show' | undefined
                autoplayVideos?: 'never' | 'always' | 'wifi' | undefined
                dataUsage?: 'default' | 'reduced' | undefined
                qualityFilter?: boolean | undefined
                hideViewCounts?: boolean | undefined
                hideLikeCounts?: boolean | undefined
              }
            }
            output: {
              sensitiveContentFilter?: 'hide' | 'warn' | 'show' | undefined
              autoplayVideos?: 'never' | 'always' | 'wifi' | undefined
              dataUsage?: 'default' | 'reduced' | undefined
              qualityFilter?: boolean | undefined
              hideViewCounts?: boolean | undefined
              hideLikeCounts?: boolean | undefined
            }
            outputFormat: 'json'
            status: 200
          }
    }
  } & {
    '/settings/muted-words': {
      $get:
        | {
            input: {}
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: {}
            output: {
              id: string
              word: string
              createdAt: string
              matchWholeWord?: boolean | undefined
              expiresAt?: string | undefined
              scope?: 'all' | 'home_timeline' | 'notifications' | undefined
            }[]
            outputFormat: 'json'
            status: 200
          }
    }
  } & {
    '/settings/muted-words': {
      $post:
        | {
            input: {
              json: {
                word: string
                matchWholeWord?: boolean | undefined
                duration?: number | undefined
                scope?: 'all' | 'home_timeline' | 'notifications' | undefined
              }
            }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: {
              json: {
                word: string
                matchWholeWord?: boolean | undefined
                duration?: number | undefined
                scope?: 'all' | 'home_timeline' | 'notifications' | undefined
              }
            }
            output: {
              id: string
              word: string
              createdAt: string
              matchWholeWord?: boolean | undefined
              expiresAt?: string | undefined
              scope?: 'all' | 'home_timeline' | 'notifications' | undefined
            }
            outputFormat: 'json'
            status: 201
          }
    }
  } & {
    '/settings/muted-words/:wordId': {
      $delete:
        | {
            input: { param: { wordId: string } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
        | { input: { param: { wordId: string } }; output: {}; outputFormat: string; status: 204 }
    }
  } & {
    '/settings/sessions': {
      $get:
        | {
            input: {}
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: {}
            output: {
              id: string
              device: {
                type?: string | undefined
                os?: string | undefined
                browser?: string | undefined
                name?: string | undefined
              }
              createdAt: string
              lastActiveAt: string
              isCurrent?: boolean | undefined
              location?:
                | {
                    country?: string | undefined
                    city?: string | undefined
                    ip?: string | undefined
                  }
                | undefined
            }[]
            outputFormat: 'json'
            status: 200
          }
    }
  } & {
    '/settings/sessions/:sessionId': {
      $delete:
        | {
            input: { param: { sessionId: string } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
        | { input: { param: { sessionId: string } }; output: {}; outputFormat: string; status: 204 }
    }
  } & {
    '/settings/connected-apps': {
      $get:
        | {
            input: {}
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: {}
            output: {
              id: string
              name: string
              permissions: string[]
              authorizedAt: string
              description?: string | undefined
              icon?: string | undefined
              lastUsedAt?: string | undefined
            }[]
            outputFormat: 'json'
            status: 200
          }
    }
  } & {
    '/settings/connected-apps/:appId': {
      $delete:
        | {
            input: { param: { appId: string } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
        | { input: { param: { appId: string } }; output: {}; outputFormat: string; status: 204 }
    }
  } & {
    '/settings/data-export': {
      $post:
        | {
            input: {}
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: {}
            output: { requestId?: string | undefined; estimatedCompletionAt?: string | undefined }
            outputFormat: 'json'
            status: 202
          }
    }
  } & {
    '/settings/data-export/:requestId': {
      $get:
        | {
            input: { param: { requestId: string } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { param: { requestId: string } }
            output: {
              status?: 'pending' | 'processing' | 'completed' | 'failed' | undefined
              downloadUrl?: string | undefined
              expiresAt?: string | undefined
            }
            outputFormat: 'json'
            status: 200
          }
    }
  } & {
    '/settings/deactivate': {
      $post:
        | {
            input: { json: { password: string } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
        | { input: { json: { password: string } }; output: {}; outputFormat: string; status: 200 }
    }
  } & {
    '/reports': {
      $post:
        | {
            input: {
              json: {
                type: 'post' | 'message' | 'user'
                targetId: string
                reason:
                  | 'spam'
                  | 'harassment'
                  | 'hate_speech'
                  | 'violence'
                  | 'self_harm'
                  | 'misinformation'
                  | 'illegal_content'
                  | 'copyright'
                  | 'impersonation'
                  | 'other'
                description?: string | undefined
                relatedPostIds?: string[] | undefined
              }
            }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: {
              json: {
                type: 'post' | 'message' | 'user'
                targetId: string
                reason:
                  | 'spam'
                  | 'harassment'
                  | 'hate_speech'
                  | 'violence'
                  | 'self_harm'
                  | 'misinformation'
                  | 'illegal_content'
                  | 'copyright'
                  | 'impersonation'
                  | 'other'
                description?: string | undefined
                relatedPostIds?: string[] | undefined
              }
            }
            output: {
              id: string
              type: 'post' | 'message' | 'user'
              reason:
                | 'spam'
                | 'harassment'
                | 'hate_speech'
                | 'violence'
                | 'self_harm'
                | 'misinformation'
                | 'illegal_content'
                | 'copyright'
                | 'impersonation'
                | 'other'
              status: 'pending' | 'in_review' | 'resolved' | 'dismissed'
              createdAt: string
              targetId?: string | undefined
              description?: string | undefined
              resolution?: string | undefined
              resolvedAt?: string | undefined
            }
            outputFormat: 'json'
            status: 201
          }
    }
  } & {
    '/reports/:reportId': {
      $get:
        | {
            input: { param: { reportId: string } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { param: { reportId: string } }
            output: {
              id: string
              type: 'post' | 'message' | 'user'
              reason:
                | 'spam'
                | 'harassment'
                | 'hate_speech'
                | 'violence'
                | 'self_harm'
                | 'misinformation'
                | 'illegal_content'
                | 'copyright'
                | 'impersonation'
                | 'other'
              status: 'pending' | 'in_review' | 'resolved' | 'dismissed'
              createdAt: string
              targetId?: string | undefined
              description?: string | undefined
              resolution?: string | undefined
              resolvedAt?: string | undefined
            }
            outputFormat: 'json'
            status: 200
          }
    }
  } & {
    '/moderation/queue': {
      $get:
        | {
            input: {
              query: {
                status?: 'pending' | 'in_review' | 'resolved' | undefined
                type?: 'post' | 'message' | 'user' | undefined
                cursor?: string | undefined
                limit?: number | undefined
              }
            }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: {
              query: {
                status?: 'pending' | 'in_review' | 'resolved' | undefined
                type?: 'post' | 'message' | 'user' | undefined
                cursor?: string | undefined
                limit?: number | undefined
              }
            }
            output: {
              data: {
                id: string
                type: 'post' | 'message' | 'user'
                status: 'pending' | 'in_review' | 'resolved'
                createdAt: string
                targetId?: string | undefined
                reports?:
                  | {
                      id: string
                      type: 'post' | 'message' | 'user'
                      reason:
                        | 'spam'
                        | 'harassment'
                        | 'hate_speech'
                        | 'violence'
                        | 'self_harm'
                        | 'misinformation'
                        | 'illegal_content'
                        | 'copyright'
                        | 'impersonation'
                        | 'other'
                      status: 'pending' | 'in_review' | 'resolved' | 'dismissed'
                      createdAt: string
                      targetId?: string | undefined
                      description?: string | undefined
                      resolution?: string | undefined
                      resolvedAt?: string | undefined
                    }[]
                  | undefined
                assignedTo?: string | undefined
                priority?: 'low' | 'medium' | 'high' | 'urgent' | undefined
                content?: {} | undefined
                userHistory?:
                  | { previousViolations?: number | undefined; accountAge?: string | undefined }
                  | undefined
              }[]
              nextCursor?: string | undefined
              stats?:
                | {
                    pending?: number | undefined
                    inReview?: number | undefined
                    resolvedToday?: number | undefined
                  }
                | undefined
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: {
              query: {
                status?: 'pending' | 'in_review' | 'resolved' | undefined
                type?: 'post' | 'message' | 'user' | undefined
                cursor?: string | undefined
                limit?: number | undefined
              }
            }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 403
          }
    }
  } & {
    '/moderation/items/:itemId': {
      $get:
        | {
            input: { param: { itemId: string } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { param: { itemId: string } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 403
          }
        | {
            input: { param: { itemId: string } }
            output: {
              id: string
              type: 'post' | 'message' | 'user'
              status: 'pending' | 'in_review' | 'resolved'
              createdAt: string
              targetId?: string | undefined
              reports?:
                | {
                    id: string
                    type: 'post' | 'message' | 'user'
                    reason:
                      | 'spam'
                      | 'harassment'
                      | 'hate_speech'
                      | 'violence'
                      | 'self_harm'
                      | 'misinformation'
                      | 'illegal_content'
                      | 'copyright'
                      | 'impersonation'
                      | 'other'
                    status: 'pending' | 'in_review' | 'resolved' | 'dismissed'
                    createdAt: string
                    targetId?: string | undefined
                    description?: string | undefined
                    resolution?: string | undefined
                    resolvedAt?: string | undefined
                  }[]
                | undefined
              assignedTo?: string | undefined
              priority?: 'low' | 'medium' | 'high' | 'urgent' | undefined
              content?: {} | undefined
              userHistory?:
                | { previousViolations?: number | undefined; accountAge?: string | undefined }
                | undefined
            }
            outputFormat: 'json'
            status: 200
          }
    }
  } & {
    '/moderation/items/:itemId/action': {
      $post:
        | {
            input: { param: { itemId: string } } & {
              json: {
                action: 'approve' | 'remove_content' | 'warn_user' | 'suspend_user' | 'dismiss'
                note?: string | undefined
                suspensionDuration?: number | undefined
                notifyUser?: boolean | undefined
              }
            }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { param: { itemId: string } } & {
              json: {
                action: 'approve' | 'remove_content' | 'warn_user' | 'suspend_user' | 'dismiss'
                note?: string | undefined
                suspensionDuration?: number | undefined
                notifyUser?: boolean | undefined
              }
            }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 403
          }
        | {
            input: { param: { itemId: string } } & {
              json: {
                action: 'approve' | 'remove_content' | 'warn_user' | 'suspend_user' | 'dismiss'
                note?: string | undefined
                suspensionDuration?: number | undefined
                notifyUser?: boolean | undefined
              }
            }
            output: {
              id: string
              type: 'post' | 'message' | 'user'
              status: 'pending' | 'in_review' | 'resolved'
              createdAt: string
              targetId?: string | undefined
              reports?:
                | {
                    id: string
                    type: 'post' | 'message' | 'user'
                    reason:
                      | 'spam'
                      | 'harassment'
                      | 'hate_speech'
                      | 'violence'
                      | 'self_harm'
                      | 'misinformation'
                      | 'illegal_content'
                      | 'copyright'
                      | 'impersonation'
                      | 'other'
                    status: 'pending' | 'in_review' | 'resolved' | 'dismissed'
                    createdAt: string
                    targetId?: string | undefined
                    description?: string | undefined
                    resolution?: string | undefined
                    resolvedAt?: string | undefined
                  }[]
                | undefined
              assignedTo?: string | undefined
              priority?: 'low' | 'medium' | 'high' | 'urgent' | undefined
              content?: {} | undefined
              userHistory?:
                | { previousViolations?: number | undefined; accountAge?: string | undefined }
                | undefined
            }
            outputFormat: 'json'
            status: 200
          }
    }
  } & {
    '/moderation/users/:userId/history': {
      $get:
        | {
            input: { param: { userId: string } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { param: { userId: string } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 403
          }
        | {
            input: { param: { userId: string } }
            output: {
              id: string
              action: string
              createdAt: string
              targetType?: string | undefined
              targetId?: string | undefined
              reason?: string | undefined
              note?: string | undefined
              moderatorId?: string | undefined
              expiresAt?: string | undefined
            }[]
            outputFormat: 'json'
            status: 200
          }
    }
  } & {
    '/moderation/users/:userId/suspend': {
      $post:
        | {
            input: { param: { userId: string } } & {
              json: { reason: string; duration?: number | undefined; note?: string | undefined }
            }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { param: { userId: string } } & {
              json: { reason: string; duration?: number | undefined; note?: string | undefined }
            }
            output: {}
            outputFormat: string
            status: 200
          }
        | {
            input: { param: { userId: string } } & {
              json: { reason: string; duration?: number | undefined; note?: string | undefined }
            }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 403
          }
    }
  } & {
    '/moderation/users/:userId/unsuspend': {
      $post:
        | {
            input: { param: { userId: string } } & { json: { note?: string | undefined } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { param: { userId: string } } & { json: { note?: string | undefined } }
            output: {}
            outputFormat: string
            status: 200
          }
        | {
            input: { param: { userId: string } } & { json: { note?: string | undefined } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 403
          }
    }
  } & {
    '/analytics/posts/:postId': {
      $get:
        | {
            input: { param: { postId: string } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { param: { postId: string } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 403
          }
        | {
            input: { param: { postId: string } }
            output: {
              postId: string
              impressions: number
              engagements: number
              reach?: number | undefined
              engagementRate?: number | undefined
              likes?: number | undefined
              reposts?: number | undefined
              replies?: number | undefined
              quotes?: number | undefined
              bookmarks?: number | undefined
              linkClicks?: number | undefined
              profileVisits?: number | undefined
              detailExpands?: number | undefined
              mediaViews?: number | undefined
              videoViews?: number | undefined
              videoWatchTime?: number | undefined
            }
            outputFormat: 'json'
            status: 200
          }
    }
  } & {
    '/analytics/account': {
      $get:
        | {
            input: { query: { period?: '7d' | '28d' | '90d' | undefined } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { query: { period?: '7d' | '28d' | '90d' | undefined } }
            output: {
              period?: string | undefined
              impressions?:
                | {
                    total?: number | undefined
                    change?: number | undefined
                    daily?: { date?: string | undefined; count?: number | undefined }[] | undefined
                  }
                | undefined
              engagements?: { total?: number | undefined; change?: number | undefined } | undefined
              profileVisits?:
                | { total?: number | undefined; change?: number | undefined }
                | undefined
              mentions?: { total?: number | undefined; change?: number | undefined } | undefined
              newFollowers?: { total?: number | undefined; change?: number | undefined } | undefined
            }
            outputFormat: 'json'
            status: 200
          }
    }
  } & {
    '/analytics/followers': {
      $get:
        | {
            input: { query: { period?: '7d' | '28d' | '90d' | undefined } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { query: { period?: '7d' | '28d' | '90d' | undefined } }
            output: {
              totalFollowers?: number | undefined
              followerGrowth?:
                | {
                    date?: string | undefined
                    gained?: number | undefined
                    lost?: number | undefined
                    net?: number | undefined
                  }[]
                | undefined
              demographics?:
                | {
                    topCountries?:
                      | { country?: string | undefined; percentage?: number | undefined }[]
                      | undefined
                    genderDistribution?:
                      | {
                          male?: number | undefined
                          female?: number | undefined
                          other?: number | undefined
                        }
                      | undefined
                    ageDistribution?:
                      | { ageRange?: string | undefined; percentage?: number | undefined }[]
                      | undefined
                  }
                | undefined
              topInterests?:
                | { interest?: string | undefined; percentage?: number | undefined }[]
                | undefined
              activeHours?:
                | { hour?: number | undefined; activityScore?: number | undefined }[]
                | undefined
            }
            outputFormat: 'json'
            status: 200
          }
    }
  } & {
    '/analytics/top-posts': {
      $get:
        | {
            input: {
              query: {
                period?: '7d' | '28d' | '90d' | undefined
                metric?: 'impressions' | 'engagements' | 'likes' | 'reposts' | undefined
                limit?: number | undefined
              }
            }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: {
              query: {
                period?: '7d' | '28d' | '90d' | undefined
                metric?: 'impressions' | 'engagements' | 'likes' | 'reposts' | undefined
                limit?: number | undefined
              }
            }
            output: {
              id?: string | undefined
              text?: string | undefined
              createdAt?: string | undefined
              analytics?:
                | {
                    postId: string
                    impressions: number
                    engagements: number
                    reach?: number | undefined
                    engagementRate?: number | undefined
                    likes?: number | undefined
                    reposts?: number | undefined
                    replies?: number | undefined
                    quotes?: number | undefined
                    bookmarks?: number | undefined
                    linkClicks?: number | undefined
                    profileVisits?: number | undefined
                    detailExpands?: number | undefined
                    mediaViews?: number | undefined
                    videoViews?: number | undefined
                    videoWatchTime?: number | undefined
                  }
                | undefined
            }[]
            outputFormat: 'json'
            status: 200
          }
    }
  },
  '/'
>
export default routes
