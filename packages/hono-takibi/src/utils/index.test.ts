import { describe, expect, it } from 'vitest'
import { isHttpMethod, isRecord } from '../guard/index.js'
import {
  ensureSuffix,
  makeBarrel,
  makeSafeKey,
  methodPath,
  normalizeTypes,
  requestParamsArray,
  toIdentifierPascalCase,
  uncapitalize,
  zodToOpenAPISchema,
} from './index.js'

describe('utils', () => {
  // normalizeTypes
  describe('normalizeTypes', () => {
    it('should return empty array if type is undefined', () => {
      expect(normalizeTypes(undefined)).toStrictEqual([])
    })
    it('should wrap string type in array', () => {
      expect(normalizeTypes('string')).toStrictEqual(['string'])
    })
    it('should return the array as is if already array', () => {
      expect(normalizeTypes(['string', 'null'])).toStrictEqual(['string', 'null'])
    })
    it('should wrap number type in array', () => {
      expect(normalizeTypes('number')).toStrictEqual(['number'])
    })
    it('should handle "null" as string', () => {
      expect(normalizeTypes('null')).toStrictEqual(['null'])
    })
    it('should handle mixed type array', () => {
      expect(normalizeTypes(['integer', 'null'])).toStrictEqual(['integer', 'null'])
    })
  })
  // isRecord
  describe('isRecord Test', () => {
    it.concurrent.each([
      [{ key: 'value' }, true],
      [{ type: 'object' }, true],
      [[], false],
      [{}, true],
      [null, false],
      [undefined, false],
      ['string', false],
      [123, false],
      [true, false],
    ])('isRecord(%j) -> %s', (input, expected) => {
      expect(isRecord(input)).toBe(expected)
    })
  })
  // isHttpMethod
  describe('isHttpMethod Test', () => {
    it.concurrent.each([
      ['get', true],
      ['post', true],
      ['put', true],
      ['delete', true],
      ['patch', true],
      ['head', true],
      ['options', true],
      ['trace', true],
      ['invalidMethod', false],
    ])(`isHttpMethod('%s') -> %s`, (method, expected) => {
      expect(isHttpMethod(method)).toBe(expected)
    })
  })
  // methodPath
  describe('methodPath', () => {
    it.concurrent.each([
      ['get', '/', 'get'],
      ['get', '/posts', 'getPosts'],
      ['get', '/posts/{id}', 'getPostsId'],
      ['get', '/user/profile', 'getUserProfile'],
      ['put', '/user/settings', 'putUserSettings'],
      ['get', '/user/preferences', 'getUserPreferences'],
      ['put', '/user/avatar', 'putUserAvatar'],
      ['get', '/user/followers', 'getUserFollowers'],
      ['get', '/user/following', 'getUserFollowing'],
      ['get', '/user/blocked', 'getUserBlocked'],
      ['post', '/auth/google', 'postAuthGoogle'],
      ['post', '/auth/facebook', 'postAuthFacebook'],
      ['post', '/auth/twitter', 'postAuthTwitter'],
      ['post', '/auth/github', 'postAuthGithub'],
      ['post', '/auth/2fa/enable', 'postAuth2faEnable'],
      ['post', '/auth/2fa/verify', 'postAuth2faVerify'],
      ['post', '/articles/draft', 'postArticlesDraft'],
      ['get', '/articles/published', 'getArticlesPublished'],
      ['get', '/articles/archived', 'getArticlesArchived'],
      ['post', '/media/upload', 'postMediaUpload'],
      ['get', '/media/gallery', 'getMediaGallery'],
      ['post', '/notifications/email', 'postNotificationsEmail'],
      ['post', '/notifications/push', 'postNotificationsPush'],
      ['put', '/notifications/settings', 'putNotificationsSettings'],
      ['post', '/payment/method', 'postPaymentMethod'],
      ['get', '/payment/history', 'getPaymentHistory'],
      ['get', '/subscription/plan', 'getSubscriptionPlan'],
      ['post', '/subscription/cancel', 'postSubscriptionCancel'],
      ['get', '/billing/address', 'getBillingAddress'],
      ['get', '/invoice/download/{id}', 'getInvoiceDownloadId'],
      ['get', '/analytics/daily', 'getAnalyticsDaily'],
      ['get', '/analytics/weekly', 'getAnalyticsWeekly'],
      ['get', '/analytics/monthly', 'getAnalyticsMonthly'],
      ['get', '/stats/overview', 'getStatsOverview'],
      ['get', '/admin/dashboard', 'getAdminDashboard'],
      ['get', '/admin/users', 'getAdminUsers'],
      ['get', '/admin/roles', 'getAdminRoles'],
      ['get', '/admin/permissions', 'getAdminPermissions'],
      ['get', '/admin/logs', 'getAdminLogs'],
      ['get', '/api/keys', 'getApiKeys'],
      ['get', '/api/usage', 'getApiUsage'],
      ['get', '/api/docs', 'getApiDocs'],
      ['post', '/webhooks', 'postWebhooks'],
      ['post', '/integration/slack', 'postIntegrationSlack'],
      ['post', '/integration/discord', 'postIntegrationDiscord'],
      ['post', '/integration/jira', 'postIntegrationJira'],
      ['post', '/integration/github', 'postIntegrationGithub'],
      ['get', '/emails/{email_id}', 'getEmailsEmailId'],
      ['get', '/emails/{email-id}', 'getEmailsEmailId'],
      ['get', '/emails/{email.id}', 'getEmailsEmailId'],
      // trailing slash paths
      ['get', '/posts/', 'getPostsIndex'],
      ['post', '/api/', 'postApiIndex'],
      ['get', '/api/reverseChiban/', 'getApiReverseChibanIndex'],
      ['get', '/users/{id}/', 'getUsersIdIndex'],
    ])(`methodPath('%s', '%s') -> '%s'`, (method, path, expected) => {
      expect(methodPath(method, path)).toBe(expected)
    })
  })
  // requestParamsArray
  describe('requestParamsArray', () => {
    it.concurrent.each([
      [
        {
          query: { id: 'z.string()' },
          params: { id: 'z.string()' },
        },
        ['query:z.object({id:z.string()})', 'params:z.object({id:z.string()})'],
      ],
      [
        { path: { petId: 'z.int64().openapi({ example: 198772 })' } },
        ['params:z.object({petId:z.int64().openapi({ example: 198772 })})'],
      ],
    ])('requestParamsArray(%o) -> %o', (input, expected) => {
      expect(requestParamsArray(input)).toStrictEqual(expected)
    })
  })
  // makeSafeKey
  describe('makeSafeKey', () => {
    it.concurrent.each([
      // Valid identifiers (returned as-is)
      ['validName', 'validName'],
      ['_underscore', '_underscore'],
      ['$dollar', '$dollar'],
      ['camelCase123', 'camelCase123'],
      ['class', 'class'],
      ['function', 'function'],
      // Invalid identifiers (wrapped in single quotes)
      ['has space', "'has space'"],
      ['invalid-name', "'invalid-name'"],
      ['123startWithNumber', "'123startWithNumber'"],
      ['has.dot', "'has.dot'"],
      ['hyphen-ated', "'hyphen-ated'"],
      ['', "''"],
      [' ', "' '"],
      ['-', "'-'"],
      // Escape handling
      ["it's", "'it\\'s'"],
      ['line\nbreak', "'line\\nbreak'"],
      ['tab\there', "'tab\\there'"],
      ['return\rhere', "'return\\rhere'"],
      ['back\\slash', "'back\\\\slash'"],
      ["quote'and\\slash", "'quote\\'and\\\\slash'"],
    ])(`makeSafeKey('%s') -> '%s'`, (input, expected) => {
      expect(makeSafeKey(input)).toBe(expected)
    })
  })
  // toIdentifierPascalCase
  describe('toIdentifierPascalCase', () => {
    it.concurrent.each([
      ['test', 'Test'],
      ['test123', 'Test123'],
      ['_test', 'Test'],
      ['$test', '$test'],
      ['foo-bar', 'FooBar'],
      ['foo@bar!baz', 'FooBarBaz'],
      ['post.title', 'PostTitle'],
      ['テスト', 'Unnamed37447'],
      ['123startWithNumber', '_123startWithNumber'],
    ])(`toIdentifierPascalCase('%s') -> '%s'`, (input, expected) => {
      expect(toIdentifierPascalCase(input)).toBe(expected)
    })
  })
  // uncapitalize
  describe('uncapitalize', () => {
    it.concurrent.each([
      ['test', 'test'],
      ['Test', 'test'],
      ['TEST', 'tEST'],
      ['', ''],
    ])(`uncapitalize('%s') -> '%s'`, (input, expected) => {
      expect(uncapitalize(input)).toBe(expected)
    })
  })
  // makeBarrel
  describe('makeBarrel', () => {
    it.concurrent('generates single export statement', () => {
      const result = makeBarrel({ User: {} })
      expect(result).toBe(`export * from './user'\n`)
    })

    it.concurrent('generates multiple export statements sorted alphabetically', () => {
      const result = makeBarrel({ User: {}, Admin: {}, Post: {} })
      expect(result).toBe(`export * from './admin'
export * from './post'
export * from './user'
`)
    })

    it.concurrent('handles PascalCase keys with uncapitalize', () => {
      const result = makeBarrel({ UserProfile: {} })
      expect(result).toBe(`export * from './userProfile'\n`)
    })

    it.concurrent('returns only newline for empty object', () => {
      const result = makeBarrel({})
      expect(result).toBe('\n')
    })

    it.concurrent('handles single lowercase key', () => {
      const result = makeBarrel({ user: {} })
      expect(result).toBe(`export * from './user'\n`)
    })
  })
  // ensureSuffix
  describe('ensureSuffix', () => {
    it.concurrent.each([
      ['test', 'Example', 'testExample'],
      ['Test', 'Link', 'TestLink'],
      ['TEST', 'Response', 'TESTResponse'],
      ['', 'Example', 'Example'],
    ])(`ensureSuffix('%s', '%s') -> '%s'`, (input, suffix, expected) => {
      expect(ensureSuffix(input, suffix)).toBe(expected)
    })
  })
  // zodToOpenAPISchema
  describe('zodToOpenAPISchema Test', () => {
    // #1: exportSchema=true, exportType=true
    it.concurrent('zodToOpenAPISchema --export-schema true --export-type true', () => {
      const result = zodToOpenAPISchema('TestSchema', 'z.object({test:z.string()})', true, true)
      const expected = `export const TestSchema=z.object({test:z.string()}).openapi('Test')\n\nexport type Test=z.infer<typeof TestSchema>`
      expect(result).toBe(expected)
    })
    // #2: exportSchema=true, exportType=false
    it.concurrent('zodToOpenAPISchema --export-schema true --export-type false', () => {
      const result = zodToOpenAPISchema('TestSchema', 'z.object({test:z.string()})', true, false)
      const expected = `export const TestSchema=z.object({test:z.string()}).openapi('Test')`
      expect(result).toBe(expected)
    })
    // #3: exportSchema=false, exportType=true
    it.concurrent('zodToOpenAPISchema --export-schema false --export-type true', () => {
      const result = zodToOpenAPISchema('TestSchema', 'z.object({test:z.string()})', false, true)
      const expected = `const TestSchema=z.object({test:z.string()}).openapi('Test')\n\nexport type Test=z.infer<typeof TestSchema>`
      expect(result).toBe(expected)
    })
    // #4: exportSchema=false, exportType=false
    it.concurrent('zodToOpenAPISchema --export-schema false --export-type false', () => {
      const result = zodToOpenAPISchema('TestSchema', 'z.object({test:z.string()})', false, false)
      const expected = `const TestSchema=z.object({test:z.string()}).openapi('Test')`
      expect(result).toBe(expected)
    })
  })
})
