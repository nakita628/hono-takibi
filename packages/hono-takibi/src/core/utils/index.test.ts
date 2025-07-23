import { describe, expect, it } from 'vitest'
import {
  escapeStringLiteral,
  getToSafeIdentifier,
  refName,
  removeZodPrefix,
  routeName,
  sanitizeIdentifier,
  stripMaxIfLtExist,
  stripMinIfgtExist,
  stripMinMaxExist,
} from '.'

// Test run
// pnpm vitest run ./src/core/utils/index.test.ts

describe('utils', () => {
  // escapeStringLiteral
  describe('escapeStringLiteralingLiteral', () => {
    it.concurrent(`escapeStringLiteral('') -> ''`, () => {
      const result = escapeStringLiteral('')
      const expected = ''
      expect(result).toBe(expected)
    })
    it.concurrent(`escapeStringLiteral("'") -> "\\'"`, () => {
      const result = escapeStringLiteral("'")
      const expected = "\\'"
      expect(result).toBe(expected)
    })
    it.concurrent(`escapeStringLiteral("'test") -> "\\'test"`, () => {
      const result = escapeStringLiteral("'test")
      const expected = "\\'test"
      expect(result).toBe(expected)
    })
    it.concurrent(`escapeStringLiteral("It's a test") -> "It\\'s a test"`, () => {
      const result = escapeStringLiteral("It's a test")
      const expected = "It\\'s a test"
      expect(result).toBe(expected)
    })
    it.concurrent(
      `escapeStringLiteral('test "string" with quotes') -> 'test "string" with quotes'`,
      () => {
        const result = escapeStringLiteral('test "string" with quotes')
        const expected = 'test "string" with quotes'
        expect(result).toBe(expected)
      },
    )
    it.concurrent(
      `escapeStringLiteral("Retrieve Santa's wishlist for Christmas.") -> "Retrieve Santa\\'s wishlist for Christmas."`,
      () => {
        const result = escapeStringLiteral("Retrieve Santa's wishlist for Christmas.")
        const expected = "Retrieve Santa\\'s wishlist for Christmas."
        expect(result).toBe(expected)
      },
    )
    it.concurrent(`escapeStringLiteral("Santa's wishlist.") -> "Santa\\'s wishlist."`, () => {
      const result = escapeStringLiteral("Santa's wishlist.")
      const expected = "Santa\\'s wishlist."
      expect(result).toBe(expected)
    })
    it.concurrent(`escapeStringLiteral("back\\\\slash") -> "back\\\\\\\\slash"`, () => {
      const result = escapeStringLiteral('back\\slash')
      const expected = 'back\\\\slash'
      expect(result).toBe(expected)
    })

    it.concurrent(`escapeStringLiteral("full　width　space") -> "full width space"`, () => {
      const result = escapeStringLiteral('full　width　space')
      const expected = 'full width space'
      expect(result).toBe(expected)
    })
    it.concurrent(`escapeStringLiteral("multi\\nline\\ntext") -> "multi line text"`, () => {
      const result = escapeStringLiteral('multi\nline\ntext')
      const expected = 'multi line text'
      expect(result).toBe(expected)
    })
    it.concurrent(`escapeStringLiteral("\\u200Bhidden") -> "hidden"`, () => {
      const result = escapeStringLiteral('\u200Bhidden')
      const expected = 'hidden'
      expect(result).toBe(expected)
    })

    it.concurrent(`escapeStringLiteral("   trim me   ") -> "trim me"`, () => {
      const result = escapeStringLiteral('   trim me   ')
      const expected = 'trim me'
      expect(result).toBe(expected)
    })

    it.concurrent(`escapeStringLiteral("\\t tabbed") -> "tabbed"`, () => {
      const result = escapeStringLiteral('\t tabbed')
      const expected = 'tabbed'
      expect(result).toBe(expected)
    })

    it.concurrent(`escapeStringLiteral("a\\nb\\tc\\u200Bd\\uFEFF") -> "a b c d"`, () => {
      const result = escapeStringLiteral('a\nb\tc\u200Bd\uFEFF')
      const expected = 'a b c d'
      expect(result).toBe(expected)
    })
  })

  // getToSafeIdentifier
  describe('getToSafeIdentifier', () => {
    it('should return the string as-is if it is a valid identifier', () => {
      expect(getToSafeIdentifier('validName')).toBe('validName')
      expect(getToSafeIdentifier('_underscore')).toBe('_underscore')
      expect(getToSafeIdentifier('$dollar')).toBe('$dollar')
      expect(getToSafeIdentifier('camelCase123')).toBe('camelCase123')
    })

    it('should quote the string if it contains invalid characters', () => {
      expect(getToSafeIdentifier('invalid-name')).toBe('"invalid-name"')
      expect(getToSafeIdentifier('123startWithNumber')).toBe('"123startWithNumber"')
      expect(getToSafeIdentifier('has space')).toBe('"has space"')
      expect(getToSafeIdentifier('has.dot')).toBe('"has.dot"')
      expect(getToSafeIdentifier('hyphen-ated')).toBe('"hyphen-ated"')
    })

    it('should quote reserved keywords', () => {
      expect(getToSafeIdentifier('class')).toBe('class')
      expect(getToSafeIdentifier('function')).toBe('function')
    })

    it('should handle edge cases correctly', () => {
      expect(getToSafeIdentifier('')).toBe('""')
      expect(getToSafeIdentifier(' ')).toBe('" "')
      expect(getToSafeIdentifier('-')).toBe('"-"')
    })
  })

  // removeZodPrefix
  describe('removeZodPrefix', () => {
    it.concurrent(`removeZodPrefix('z.string().min(1)') -> 'string().min(1)'`, () => {
      const result = removeZodPrefix('z.string().min(1)')
      const expected = 'string().min(1)'
      expect(result).toBe(expected)
    })
    it.concurrent(`removeZodPrefix('z.number().min(1)') -> 'number().min(1)'`, () => {
      const result = removeZodPrefix('z.number().min(1)')
      const expected = 'number().min(1)'
      expect(result).toBe(expected)
    })
  })

  // sanitizeIdentifier
  describe('sanitizeIdentifier', () => {
    it.concurrent(`sanitizeIdentifier('test') -> 'test'`, () => {
      expect(sanitizeIdentifier('test')).toBe('test')
    })
    it.concurrent(`sanitizeIdentifier('test123') -> 'test123'`, () => {
      expect(sanitizeIdentifier('test123')).toBe('test123')
    })
    it.concurrent(`sanitizeIdentifier('_test') -> '_test'`, () => {
      expect(sanitizeIdentifier('_test')).toBe('_test')
    })
    it.concurrent(`sanitizeIdentifier('$test') -> '$test'`, () => {
      expect(sanitizeIdentifier('$test')).toBe('$test')
    })
    it.concurrent(`sanitizeIdentifier('foo-bar') -> 'foo_bar'`, () => {
      expect(sanitizeIdentifier('foo-bar')).toBe('foo_bar')
    })
    it.concurrent(`sanitizeIdentifier('foo@bar!baz') -> 'foo_bar_baz'`, () => {
      expect(sanitizeIdentifier('foo@bar!baz')).toBe('foo_bar_baz')
    })
    it.concurrent(`sanitizeIdentifier('post.title') -> 'post_title'`, () => {
      expect(sanitizeIdentifier('post.title')).toBe('post_title')
    })
    it.concurrent(`(sanitizeIdentifier('テスト') -> '___'`, () => {
      expect(sanitizeIdentifier('テスト')).toBe('___')
    })
    it.concurrent(`sanitizeIdentifier('') -> ''`, () => {
      expect(sanitizeIdentifier('')).toBe('')
    })
  })

  // stripMaxIfLtExist
  describe('stripMaxIfLtExist', () => {
    it.concurrent(`stripMaxIfLtExist('z.number().max(1).lt(1)', 1) -> 'z.number().lt(1)'`, () => {
      const result = stripMaxIfLtExist('z.number().max(1).lt(1)', 1)
      const expected = 'z.number().lt(1)'
      expect(result).toBe(expected)
    })
  })

  // stripMinIfgtExist
  describe('stripMinIfgtExist', () => {
    it.concurrent(`stripMinIfgtExist('z.number().min(1).gt(1)', 1) -> 'z.number().gt(1)'`, () => {
      const result = stripMinIfgtExist('z.number().min(1).gt(1)', 1)
      const expected = 'z.number().gt(1)'
      expect(result).toBe(expected)
    })
  })

  // stripMinMaxExist
  describe('stripMinMaxExist', () => {
    it.concurrent(`stripMinMaxExist('z.string().min(1).max(1)', 1, 1) -> 'z.string()'`, () => {
      const result = stripMinMaxExist('z.string().min(1).max(1)', 1, 1)
      const expected = 'z.string()'
      expect(result).toBe(expected)
    })
  })

  // refName
  describe('refName', () => {
    it.concurrent(`refName('#/components/schemas/Test') -> 'Test'`, () => {
      const result = refName('#/components/schemas/Test')
      const expected = 'Test'
      expect(result).toBe(expected)
    })
  })

  // routeName
  describe('routeName', () => {
    it('routeName("get", "/posts") -> getPostsRoute', () => {
      expect(routeName('get', '/posts')).toBe('getPostsRoute')
    })
    it('routeName("get", "/posts/{id}") -> getPostsIdRoute', () => {
      expect(routeName('get', '/posts/{id}')).toBe('getPostsIdRoute')
    })
    it('routeName("get", "/user/profile") -> getUserProfileRoute', () => {
      expect(routeName('get', '/user/profile')).toBe('getUserProfileRoute')
    })
    it('routeName("put", "/user/settings") -> putUserSettingsRoute', () => {
      expect(routeName('put', '/user/settings')).toBe('putUserSettingsRoute')
    })
    it('routeName("get", "/user/preferences") -> getUserPreferencesRoute', () => {
      expect(routeName('get', '/user/preferences')).toBe('getUserPreferencesRoute')
    })
    it('routeName("put", "/user/avatar") -> putUserAvatarRoute', () => {
      expect(routeName('put', '/user/avatar')).toBe('putUserAvatarRoute')
    })
    it('routeName("get", "/user/followers") -> getUserFollowersRoute', () => {
      expect(routeName('get', '/user/followers')).toBe('getUserFollowersRoute')
    })
    it('routeName("get", "/user/following") -> getUserFollowingRoute', () => {
      expect(routeName('get', '/user/following')).toBe('getUserFollowingRoute')
    })
    it('routeName("get", "/user/blocked") -> getUserBlockedRoute', () => {
      expect(routeName('get', '/user/blocked')).toBe('getUserBlockedRoute')
    })
    it('routeName("post", "/auth/google") -> postAuthGoogleRoute', () => {
      expect(routeName('post', '/auth/google')).toBe('postAuthGoogleRoute')
    })
    it('routeName("post", "/auth/facebook") -> postAuthFacebookRoute', () => {
      expect(routeName('post', '/auth/facebook')).toBe('postAuthFacebookRoute')
    })
    it('routeName("post", "/auth/twitter") -> postAuthTwitterRoute', () => {
      expect(routeName('post', '/auth/twitter')).toBe('postAuthTwitterRoute')
    })
    it('routeName("post", "/auth/github") -> postAuthGithubRoute', () => {
      expect(routeName('post', '/auth/github')).toBe('postAuthGithubRoute')
    })
    it('routeName("post", "/auth/2fa/enable") -> postAuth2faEnableRoute', () => {
      expect(routeName('post', '/auth/2fa/enable')).toBe('postAuth2faEnableRoute')
    })
    it('routeName("post", "/auth/2fa/verify") -> postAuth2faVerifyRoute', () => {
      expect(routeName('post', '/auth/2fa/verify')).toBe('postAuth2faVerifyRoute')
    })
    it('routeName("post", "/articles/draft") -> postArticlesDraftRoute', () => {
      expect(routeName('post', '/articles/draft')).toBe('postArticlesDraftRoute')
    })
    it('routeName("get", "/articles/published") -> getArticlesPublishedRoute', () => {
      expect(routeName('get', '/articles/published')).toBe('getArticlesPublishedRoute')
    })
    it('routeName("get", "/articles/archived") -> getArticlesArchivedRoute', () => {
      expect(routeName('get', '/articles/archived')).toBe('getArticlesArchivedRoute')
    })
    it('routeName("post", "/media/upload") -> postMediaUploadRoute', () => {
      expect(routeName('post', '/media/upload')).toBe('postMediaUploadRoute')
    })
    it('routeName("get", "/media/gallery") -> getMediaGalleryRoute', () => {
      expect(routeName('get', '/media/gallery')).toBe('getMediaGalleryRoute')
    })
    it('routeName("post", "/notifications/email") -> postNotificationsEmailRoute', () => {
      expect(routeName('post', '/notifications/email')).toBe('postNotificationsEmailRoute')
    })
    it('routeName("post", "/notifications/push") -> postNotificationsPushRoute', () => {
      expect(routeName('post', '/notifications/push')).toBe('postNotificationsPushRoute')
    })
    it('routeName("put", "/notifications/settings") -> putNotificationsSettingsRoute', () => {
      expect(routeName('put', '/notifications/settings')).toBe('putNotificationsSettingsRoute')
    })
    it('routeName("post", "/payment/method") -> postPaymentMethodRoute', () => {
      expect(routeName('post', '/payment/method')).toBe('postPaymentMethodRoute')
    })
    it('routeName("get", "/payment/history") -> getPaymentHistoryRoute', () => {
      expect(routeName('get', '/payment/history')).toBe('getPaymentHistoryRoute')
    })
    it('routeName("get", "/subscription/plan") -> getSubscriptionPlanRoute', () => {
      expect(routeName('get', '/subscription/plan')).toBe('getSubscriptionPlanRoute')
    })
    it('routeName("post", "/subscription/cancel") -> postSubscriptionCancelRoute', () => {
      expect(routeName('post', '/subscription/cancel')).toBe('postSubscriptionCancelRoute')
    })
    it('routeName("get", "/billing/address") -> getBillingAddressRoute', () => {
      expect(routeName('get', '/billing/address')).toBe('getBillingAddressRoute')
    })
    it('routeName("get", "/invoice/download/{id}") -> getInvoiceDownloadIdRoute', () => {
      expect(routeName('get', '/invoice/download/{id}')).toBe('getInvoiceDownloadIdRoute')
    })
    it('routeName("get", "/analytics/daily") -> getAnalyticsDailyRoute', () => {
      expect(routeName('get', '/analytics/daily')).toBe('getAnalyticsDailyRoute')
    })
    it('routeName("get", "/analytics/weekly") -> getAnalyticsWeeklyRoute', () => {
      expect(routeName('get', '/analytics/weekly')).toBe('getAnalyticsWeeklyRoute')
    })
    it('routeName("get", "/analytics/monthly") -> getAnalyticsMonthlyRoute', () => {
      expect(routeName('get', '/analytics/monthly')).toBe('getAnalyticsMonthlyRoute')
    })
    it('routeName("get", "/stats/overview") -> getStatsOverviewRoute', () => {
      expect(routeName('get', '/stats/overview')).toBe('getStatsOverviewRoute')
    })
    it('routeName("get", "/admin/dashboard") -> getAdminDashboardRoute', () => {
      expect(routeName('get', '/admin/dashboard')).toBe('getAdminDashboardRoute')
    })
    it('routeName("get", "/admin/users") -> getAdminUsersRoute', () => {
      expect(routeName('get', '/admin/users')).toBe('getAdminUsersRoute')
    })
    it('routeName("get", "/admin/roles") -> getAdminRolesRoute', () => {
      expect(routeName('get', '/admin/roles')).toBe('getAdminRolesRoute')
    })
    it('routeName("get", "/admin/permissions") -> getAdminPermissionsRoute', () => {
      expect(routeName('get', '/admin/permissions')).toBe('getAdminPermissionsRoute')
    })
    it('routeName("get", "/admin/logs") -> getAdminLogsRoute', () => {
      expect(routeName('get', '/admin/logs')).toBe('getAdminLogsRoute')
    })
    it('routeName("get", "/api/keys") -> getApiKeysRoute', () => {
      expect(routeName('get', '/api/keys')).toBe('getApiKeysRoute')
    })
    it('routeName("get", "/api/usage") -> getApiUsageRoute', () => {
      expect(routeName('get', '/api/usage')).toBe('getApiUsageRoute')
    })
    it('routeName("get", "/api/docs") -> getApiDocsRoute', () => {
      expect(routeName('get', '/api/docs')).toBe('getApiDocsRoute')
    })
    it('routeName("post", "/webhooks") -> postWebhooksRoute', () => {
      expect(routeName('post', '/webhooks')).toBe('postWebhooksRoute')
    })
    it('routeName("post", "/integration/slack") -> postIntegrationSlackRoute', () => {
      expect(routeName('post', '/integration/slack')).toBe('postIntegrationSlackRoute')
    })
    it('routeName("post", "/integration/discord") -> postIntegrationDiscordRoute', () => {
      expect(routeName('post', '/integration/discord')).toBe('postIntegrationDiscordRoute')
    })
    it('routeName("post", "/integration/jira") -> postIntegrationJiraRoute', () => {
      expect(routeName('post', '/integration/jira')).toBe('postIntegrationJiraRoute')
    })
    it('routeName("post", "/integration/github") -> postIntegrationGithubRoute', () => {
      expect(routeName('post', '/integration/github')).toBe('postIntegrationGithubRoute')
    })
    it('routeName("get", "/emails/{email_id}") -> getEmailsEmailIdRoute', () => {
      expect(routeName('get', '/emails/{email_id}')).toBe('getEmailsEmailIdRoute')
    })
    it('routeName("get", "/emails/{email-id}") -> getEmailsEmailIdRoute', () => {
      expect(routeName('get', '/emails/{email-id}')).toBe('getEmailsEmailIdRoute')
    })
    it('routeName("get", "/emails/{email.id}") -> getEmailsEmailIdRoute', () => {
      expect(routeName('get', '/emails/{email.id}')).toBe('getEmailsEmailIdRoute')
    })
  })
})
