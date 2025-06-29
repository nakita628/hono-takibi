import { describe, it, expect } from 'vitest'
import { routeName } from '.'

// Test run
// pnpm vitest run ./src/generator/zod-openapi-hono/openapi/route/route-name.test.ts

const routeNameTestCases = [
  { method: 'get', path: '/posts', expected: 'getPostsRoute' },
  { method: 'get', path: '/posts/{id}', expected: 'getPostsIdRoute' },
  { method: 'get', path: '/user/profile', expected: 'getUserProfileRoute' },
  { method: 'put', path: '/user/settings', expected: 'putUserSettingsRoute' },
  { method: 'get', path: '/user/preferences', expected: 'getUserPreferencesRoute' },
  { method: 'put', path: '/user/avatar', expected: 'putUserAvatarRoute' },
  { method: 'get', path: '/user/followers', expected: 'getUserFollowersRoute' },
  { method: 'get', path: '/user/following', expected: 'getUserFollowingRoute' },
  { method: 'get', path: '/user/blocked', expected: 'getUserBlockedRoute' },
  { method: 'post', path: '/auth/google', expected: 'postAuthGoogleRoute' },
  { method: 'post', path: '/auth/facebook', expected: 'postAuthFacebookRoute' },
  { method: 'post', path: '/auth/twitter', expected: 'postAuthTwitterRoute' },
  { method: 'post', path: '/auth/github', expected: 'postAuthGithubRoute' },
  { method: 'post', path: '/auth/2fa/enable', expected: 'postAuth2faEnableRoute' },
  { method: 'post', path: '/auth/2fa/verify', expected: 'postAuth2faVerifyRoute' },
  { method: 'post', path: '/articles/draft', expected: 'postArticlesDraftRoute' },
  { method: 'get', path: '/articles/published', expected: 'getArticlesPublishedRoute' },
  { method: 'get', path: '/articles/archived', expected: 'getArticlesArchivedRoute' },
  { method: 'post', path: '/media/upload', expected: 'postMediaUploadRoute' },
  { method: 'get', path: '/media/gallery', expected: 'getMediaGalleryRoute' },
  { method: 'post', path: '/notifications/email', expected: 'postNotificationsEmailRoute' },
  { method: 'post', path: '/notifications/push', expected: 'postNotificationsPushRoute' },
  { method: 'put', path: '/notifications/settings', expected: 'putNotificationsSettingsRoute' },
  { method: 'post', path: '/payment/method', expected: 'postPaymentMethodRoute' },
  { method: 'get', path: '/payment/history', expected: 'getPaymentHistoryRoute' },
  { method: 'get', path: '/subscription/plan', expected: 'getSubscriptionPlanRoute' },
  { method: 'post', path: '/subscription/cancel', expected: 'postSubscriptionCancelRoute' },
  { method: 'get', path: '/billing/address', expected: 'getBillingAddressRoute' },
  { method: 'get', path: '/invoice/download/{id}', expected: 'getInvoiceDownloadIdRoute' },
  { method: 'get', path: '/analytics/daily', expected: 'getAnalyticsDailyRoute' },
  { method: 'get', path: '/analytics/weekly', expected: 'getAnalyticsWeeklyRoute' },
  { method: 'get', path: '/analytics/monthly', expected: 'getAnalyticsMonthlyRoute' },
  { method: 'get', path: '/stats/overview', expected: 'getStatsOverviewRoute' },
  { method: 'get', path: '/admin/dashboard', expected: 'getAdminDashboardRoute' },
  { method: 'get', path: '/admin/users', expected: 'getAdminUsersRoute' },
  { method: 'get', path: '/admin/roles', expected: 'getAdminRolesRoute' },
  { method: 'get', path: '/admin/permissions', expected: 'getAdminPermissionsRoute' },
  { method: 'get', path: '/admin/logs', expected: 'getAdminLogsRoute' },
  { method: 'get', path: '/api/keys', expected: 'getApiKeysRoute' },
  { method: 'get', path: '/api/usage', expected: 'getApiUsageRoute' },
  { method: 'get', path: '/api/docs', expected: 'getApiDocsRoute' },
  { method: 'post', path: '/webhooks', expected: 'postWebhooksRoute' },
  { method: 'post', path: '/integration/slack', expected: 'postIntegrationSlackRoute' },
  { method: 'post', path: '/integration/discord', expected: 'postIntegrationDiscordRoute' },
  { method: 'post', path: '/integration/jira', expected: 'postIntegrationJiraRoute' },
  { method: 'post', path: '/integration/github', expected: 'postIntegrationGithubRoute' },
  { method: 'get', path: '/emails/{email_id}', expected: 'getEmailsEmailIdRoute' },
]

describe('routeName', () => {
  it.concurrent.each(routeNameTestCases)(
    'routeName($method, $path) -> $expected',
    async ({ method, path, expected }) => {
      const result = routeName(method, path)
      expect(result).toBe(expected)
    },
  )
})
