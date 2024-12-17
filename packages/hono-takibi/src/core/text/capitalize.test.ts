import { describe, expect, it } from 'vitest'
import { capitalize } from './capitalize'

const capitalizeTestCases = [
  { str: 'posts', expected: 'Posts' },
  { str: 'postsId', expected: 'PostsId' },
  { str: 'userProfile', expected: 'UserProfile' },
  { str: 'userSettings', expected: 'UserSettings' },
  { str: 'userPreferences', expected: 'UserPreferences' },
  { str: 'userAvatar', expected: 'UserAvatar' },
  { str: 'userFollowers', expected: 'UserFollowers' },
  { str: 'userFollowing', expected: 'UserFollowing' },
  { str: 'userBlocked', expected: 'UserBlocked' },
  { str: 'authGoogle', expected: 'AuthGoogle' },
  { str: 'authFacebook', expected: 'AuthFacebook' },
  { str: 'authTwitter', expected: 'AuthTwitter' },
  { str: 'authGithub', expected: 'AuthGithub' },
  { str: 'twoFactorAuth', expected: 'TwoFactorAuth' },
  { str: 'passwordReset', expected: 'PasswordReset' },
  { str: 'emailVerification', expected: 'EmailVerification' },
  { str: 'articleDraft', expected: 'ArticleDraft' },
  { str: 'articlePublished', expected: 'ArticlePublished' },
  { str: 'articleArchived', expected: 'ArticleArchived' },
  { str: 'contentModeration', expected: 'ContentModeration' },
  { str: 'mediaUpload', expected: 'MediaUpload' },
  { str: 'mediaGallery', expected: 'MediaGallery' },
  { str: 'notificationEmail', expected: 'NotificationEmail' },
  { str: 'notificationPush', expected: 'NotificationPush' },
  { str: 'notificationSettings', expected: 'NotificationSettings' },
  { str: 'notificationPreferences', expected: 'NotificationPreferences' },
  { str: 'paymentMethod', expected: 'PaymentMethod' },
  { str: 'paymentHistory', expected: 'PaymentHistory' },
  { str: 'subscriptionPlan', expected: 'SubscriptionPlan' },
  { str: 'subscriptionCancel', expected: 'SubscriptionCancel' },
  { str: 'billingAddress', expected: 'BillingAddress' },
  { str: 'invoiceDownload', expected: 'InvoiceDownload' },
  { str: 'analyticsDaily', expected: 'AnalyticsDaily' },
  { str: 'analyticsWeekly', expected: 'AnalyticsWeekly' },
  { str: 'analyticsMonthly', expected: 'AnalyticsMonthly' },
  { str: 'statsOverview', expected: 'StatsOverview' },
  { str: 'adminDashboard', expected: 'AdminDashboard' },
  { str: 'adminUsers', expected: 'AdminUsers' },
  { str: 'adminRoles', expected: 'AdminRoles' },
  { str: 'adminPermissions', expected: 'AdminPermissions' },
  { str: 'adminLogs', expected: 'AdminLogs' },
  { str: 'apiKeys', expected: 'ApiKeys' },
  { str: 'apiUsage', expected: 'ApiUsage' },
  { str: 'apiDocs', expected: 'ApiDocs' },
  { str: 'webhooks', expected: 'Webhooks' },
  { str: 'searchAdvanced', expected: 'SearchAdvanced' },
  { str: 'searchHistory', expected: 'SearchHistory' },
  { str: 'filterCustom', expected: 'FilterCustom' },
  { str: 'filterSaved', expected: 'FilterSaved' },
  { str: 'integrationSlack', expected: 'IntegrationSlack' },
  { str: 'integrationDiscord', expected: 'IntegrationDiscord' },
  { str: 'integrationJira', expected: 'IntegrationJira' },
  { str: 'integrationGithub', expected: 'IntegrationGithub' },
]

describe('capitalize', () => {
  it.concurrent.each(capitalizeTestCases)(
    'capitalize($str) -> $expected',
    async ({ str, expected }) => {
      const result = capitalize(str)
      expect(result).toBe(expected)
    },
  )
})
