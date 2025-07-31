import { describe, expect, it } from 'vitest'
import {
  createRoute,
  escapeStringLiteral,
  getHandlerImports,
  getToSafeIdentifier,
  groupHandlersByFileName,
  importHandlers,
  importMap,
  importRoutes,
  isHttpMethod,
  isRefObject,
  isUniqueContentSchema,
  parseCli,
  refName,
  regex,
  registerComponent,
  requestParamsArray,
  routeName,
  sanitizeIdentifier,
} from '.'

// Test run
// pnpm vitest run ./src/utils/index.test.ts

describe('utils', () => {
  // parseCli
  describe('parseCli', () => {
    it('parses minimal valid input', () => {
      const args = ['input.yaml', '-o', 'output.ts']
      const result = parseCli(args)
      expect(result).toStrictEqual({
        ok: true,
        value: {
          input: 'input.yaml',
          output: 'output.ts',
          exportType: false,
          exportSchema: false,
          template: false,
          test: false,
          basePath: undefined,
        },
      })
    })
    it('parses full valid arguments correctly', () => {
      const args = [
        'input.yaml',
        '-o',
        'output.ts',
        '--export-type',
        '--export-schema',
        '--template',
        '--test',
        '--base-path',
        '/api/v1',
      ]
      const result = parseCli(args)

      expect(result).toStrictEqual({
        ok: true,
        value: {
          input: 'input.yaml',
          output: 'output.ts',
          exportType: true,
          exportSchema: true,
          template: true,
          test: true,
          basePath: '/api/v1',
        },
      })
    })
  })
  /* ========================================================================== *
   *  Handler-Generation Utilities
   * ========================================================================== */
  // importRoutes
  describe('importRoutes', () => {
    it.concurrent('importRoutes Test', () => {
      const result = importRoutes({
        'routes.ts': ['getHonoRoute', 'getHonoXRoute', 'getZodOpenapiHonoRoute'],
      })
      const expected = [
        "import { getHonoRoute,getHonoXRoute,getZodOpenapiHonoRoute } from './routes.ts'",
      ]
      expect(result).toStrictEqual(expected)
    })
  })
  // registerComponent
  describe('registerComponent', () => {
    it.concurrent('registerComponent success', () => {
      const result = registerComponent({
        jwt: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      })
      const expected = `app.openAPIRegistry.registerComponent('securitySchemes','jwt',${JSON.stringify(
        {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      )})`
      expect(result).toBe(expected)
    })
  })
  // importMap
  describe('processImportMap', () => {
    it.concurrent('processImportMap Test', () => {
      const result = importMap(
        [
          {
            routeName: 'getHonoRoute',
            handlerName: 'getHonoRouteHandler',
            path: '/hono',
          },
          {
            routeName: 'getHonoXRoute',
            handlerName: 'getHonoXRouteHandler',
            path: '/hono-x',
          },
          {
            routeName: 'getZodOpenapiHonoRoute',
            handlerName: 'getZodOpenapiHonoRouteHandler',
            path: '/zod-openapi-hono',
          },
        ],
        'src/routes.ts',
      )
      const expected = {
        'routes.ts': ['getHonoRoute', 'getHonoXRoute', 'getZodOpenapiHonoRoute'],
      }
      expect(result).toStrictEqual(expected)
    })
  })
  /* ========================================================================== *
   *  Handler Utilities
   *    └─ Everything below relates to generating, grouping, or importing route
   *       handler functions.
   * ========================================================================== */
  // importHandlers
  describe('importHandlers', () => {
    it.concurrent('importHandlers', () => {
      const result = importHandlers(
        {
          'honoHandler.ts': ['getHonoRouteHandler'],
          'honoXHandler.ts': ['getHonoXRouteHandler'],
          'zodOpenapiHonoHandler.ts': ['getZodOpenapiHonoRouteHandler'],
        },
        'src/routes.ts',
      )
      const expected = [
        "import { getHonoRouteHandler } from './handlers/honoHandler.ts'",
        "import { getHonoXRouteHandler } from './handlers/honoXHandler.ts'",
        "import { getZodOpenapiHonoRouteHandler } from './handlers/zodOpenapiHonoHandler.ts'",
      ]
      expect(result).toStrictEqual(expected)
    })
  })
  // groupHandlersByFileName
  describe('groupHandlersByFileName', () => {
    it.concurrent('groupHandlersByFileName Test', () => {
      const result = groupHandlersByFileName([
        {
          fileName: 'honoHandler.ts',
          testFileName: 'honoHandler.test.ts',
          routeHandlerContents: [
            'export const getHonoRouteHandler:RouteHandler<typeof getHonoRoute>=async(c)=>{}',
          ],
          routeNames: ['getHonoRoute'],
        },
        {
          fileName: 'honoXHandler.ts',
          testFileName: 'honoXHandler.test.ts',
          routeHandlerContents: [
            'export const getHonoXRouteHandler:RouteHandler<typeof getHonoXRoute>=async(c)=>{}',
          ],
          routeNames: ['getHonoXRoute'],
        },
        {
          fileName: 'zodOpenapiHonoHandler.ts',
          testFileName: 'zodOpenapiHonoHandler.test.ts',
          routeHandlerContents: [
            'export const getZodOpenapiHonoRouteHandler:RouteHandler<typeof getZodOpenapiHonoRoute>=async(c)=>{}',
          ],
          routeNames: ['getZodOpenapiHonoRoute'],
        },
      ])

      const expected = [
        {
          fileName: 'honoHandler.ts',
          testFileName: 'honoHandler.test.ts',
          routeHandlerContents: [
            'export const getHonoRouteHandler:RouteHandler<typeof getHonoRoute>=async(c)=>{}',
          ],
          routeNames: ['getHonoRoute'],
        },
        {
          fileName: 'honoXHandler.ts',
          testFileName: 'honoXHandler.test.ts',
          routeHandlerContents: [
            'export const getHonoXRouteHandler:RouteHandler<typeof getHonoXRoute>=async(c)=>{}',
          ],
          routeNames: ['getHonoXRoute'],
        },
        {
          fileName: 'zodOpenapiHonoHandler.ts',
          testFileName: 'zodOpenapiHonoHandler.test.ts',
          routeHandlerContents: [
            'export const getZodOpenapiHonoRouteHandler:RouteHandler<typeof getZodOpenapiHonoRoute>=async(c)=>{}',
          ],
          routeNames: ['getZodOpenapiHonoRoute'],
        },
      ]
      expect(result).toStrictEqual(expected)
    })
  })
  // importHandlers
  describe('getHandlerImports', () => {
    it.concurrent('getHandlerImports Test', () => {
      const result = getHandlerImports([
        {
          routeName: 'getHonoRoute',
          handlerName: 'getHonoRouteHandler',
          path: '/hono',
        },
        {
          routeName: 'getHonoXRoute',
          handlerName: 'getHonoXRouteHandler',
          path: '/hono-x',
        },
        {
          routeName: 'getZodOpenapiHonoRoute',
          handlerName: 'getZodOpenapiHonoRouteHandler',
          path: '/zod-openapi-hono',
        },
      ])
      const expected = {
        'honoHandler.ts': ['getHonoRouteHandler'],
        'honoXHandler.ts': ['getHonoXRouteHandler'],
        'zodOpenapiHonoHandler.ts': ['getZodOpenapiHonoRouteHandler'],
      }
      expect(result).toStrictEqual(expected)
    })
  })
  // isHttpMethod
  describe('isHttpMethod', () => {
    it.concurrent.each([
      { method: 'get', expected: true },
      { method: 'post', expected: true },
      { method: 'put', expected: true },
      { method: 'delete', expected: true },
      { method: 'patch', expected: true },
      { method: 'options', expected: true },
      { method: 'head', expected: true },
      { method: 'trace', expected: true },
      { method: 'GET', expected: false },
      { method: 'POST', expected: false },
      { method: 'PUT', expected: false },
      { method: 'DELETE', expected: false },
      { method: 'PATCH', expected: false },
      { method: 'OPTIONS', expected: false },
      { method: 'HEAD', expected: false },
      { method: 'TRACE', expected: false },
    ])('isHttpMethod($method) -> $expected', async ({ method, expected }) => {
      const result = isHttpMethod(method)
      expect(result).toBe(expected)
    })
  })
  // isRefObject
  describe('isRefObject Test', () => {
    it.concurrent('isRefObject -> true', () => {
      const result = isRefObject({ type: 'object' })
      const expected = true
      expect(result).toBe(expected)
    })
    it.concurrent('isRefObject -> true', () => {
      const result = isRefObject({ $ref: '#/components/schemas/Test' })
      const expected = true
      expect(result).toBe(expected)
    })
    it.concurrent('isRefObject -> false', () => {
      const result = isRefObject('string')
      const expected = false
      expect(result).toBe(expected)
    })
    it.concurrent('isRefObject -> false', () => {
      const result = isRefObject(1)
      const expected = false
      expect(result).toBe(expected)
    })
    it.concurrent('isRefObject -> false', () => {
      const result = isRefObject(true)
      const expected = false
      expect(result).toBe(expected)
    })
    it.concurrent('isRefObject -> false', () => {
      const result = isRefObject(false)
      const expected = false
      expect(result).toBe(expected)
    })
  })
  // isUniqueContentSchema
  describe('isUniqueContentSchema Test', () => {
    it.concurrent('isUniqueContentSchema -> true', () => {
      const result = isUniqueContentSchema(['application/json'], {
        'application/json': { schema: { $ref: '#/components/schemas/Test' } },
      })
      const expected = true
      expect(result).toBe(expected)
    })
    it.concurrent('isUniqueContentSchema -> false', () => {
      const result = isUniqueContentSchema(['application/json', 'application/xml'], {
        'application/json': { schema: { $ref: '#/components/schemas/Test' } },
        'application/xml': { schema: { $ref: '#/components/schemas/Example' } },
      })
      const expected = false
      expect(result).toBe(expected)
    })
  })
  /* ========================================================================== *
   *  OpenAPI $ref
   * ========================================================================== */
  // refName
  describe('refName', () => {
    it.concurrent(`refName('#/components/schemas/Test') -> 'Test'`, () => {
      const result = refName('#/components/schemas/Test')
      const expected = 'Test'
      expect(result).toBe(expected)
    })
  })
  /* ========================================================================== *
   *  Route Code Generation
   *    • createRoute itself
   *    • utilities that build or modify the `request:{ ... }` object
   * ========================================================================== */

  // routeName
  describe('routeName', () => {
    it.concurrent.each([
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
      { method: 'get', path: '/emails/{email-id}', expected: 'getEmailsEmailIdRoute' },
      { method: 'get', path: '/emails/{email.id}', expected: 'getEmailsEmailIdRoute' },
    ])('routeName($method, $path) -> $expected', ({ method, path, expected }) => {
      const result = routeName(method, path)
      expect(result).toBe(expected)
    })
  })
  // createRoute
  describe('createRoute', () => {
    it.concurrent('createRoute Test', () => {
      const result = createRoute({
        routeName: 'deletePostsId',
        tags: '["Post"]',
        method: 'delete',
        path: '/posts/{id}',
        description: 'delete post',
        requestParams: 'request:{params:z.object({id:z.uuid()})},',
        responses: `204:{description:'No Content',},400:{description:'Bad Request',content:{'application/json':{schema:z.object({message:z.string()}),},},},500:{description:'Internal Server Error',content:{'application/json':{schema: z.object({message: z.string()}),},},},`,
      })
      const expected = `export const deletePostsId=createRoute({["Post"]delete/posts/{id}delete postrequest:{params:z.object({id:z.uuid()})},204:{description:'No Content',},400:{description:'Bad Request',content:{'application/json':{schema:z.object({message:z.string()}),},},},500:{description:'Internal Server Error',content:{'application/json':{schema: z.object({message: z.string()}),},},},})`
      expect(result).toBe(expected)
    })
  })
  /* ========================================================================== *
   *  Request Parameters
   * ========================================================================== */
  describe('requestParamsArray', () => {
    it.concurrent(
      `requestParamsArray({
        query: { id: 'z.string()' },
        params: { id: 'z.string()' },
      },) -> ['query:z.object({id:z.string()})', 'params:z.object({id:z.string()})']`,
      () => {
        const result = requestParamsArray({
          query: { id: 'z.string()' },
          params: { id: 'z.string()' },
        })
        const expected = ['query:z.object({id:z.string()})', 'params:z.object({id:z.string()})']
        expect(result).toStrictEqual(expected)
      },
    )
    it.concurrent(
      `requestParamsArray({ path: { petId: 'z.number().int()' } }) -> ['params:z.object({petId:z.number().int()})']`,
      () => {
        const result = requestParamsArray({ path: { petId: 'z.number().int()' } })
        const expected = ['params:z.object({petId:z.number().int()})']
        expect(result).toStrictEqual(expected)
      },
    )
  })

  /* ========================================================================== *
   *  String Escaping
   * ========================================================================== */
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
  /* ========================================================================== *
   *  Identifier
   * ========================================================================== */
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
  /* ========================================================================== *
   *  Zod Schema
   * ========================================================================== */
  // regex
  describe('regex', () => {
    it.concurrent(`regex('^[a-z]+$') -> .regex(/^[a-z]+$/)`, () => {
      const result = regex('^[a-z]+$')
      const expected = '.regex(/^[a-z]+$/)'
      expect(result).toBe(expected)
    })
    it.concurrent(`regex('^\\d{4}-\\d{2}-\\d{2}$') -> .regex(/^\\d{4}-\\d{2}-\\d{2}$/)`, () => {
      const result = regex('^\\d{4}-\\d{2}-\\d{2}$')
      const expected = '.regex(/^\\d{4}-\\d{2}-\\d{2}$/)'
      expect(result).toBe(expected)
    })
    it.concurrent(
      `regex('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Z|a-z]{2,}$') -> .regex(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Z|a-z]{2,}$/)`,
      () => {
        const result = regex('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Z|a-z]{2,}$')
        const expected = '.regex(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Z|a-z]{2,}$/)'
        expect(result).toBe(expected)
      },
    )
    it.concurrent(`regex('^#[0-9a-fA-F]{6}$') -> .regex(/^#[0-9a-fA-F]{6}$/)`, () => {
      const result = regex('^#[0-9a-fA-F]{6}$')
      const expected = '.regex(/^#[0-9a-fA-F]{6}$/)'
      expect(result).toBe(expected)
    })
    it.concurrent(
      `regex('^(https?:\\/\\/)?[\\w.-]+\\.[a-zA-Z]{2,}([\\/\\w .-]*)*\\/?$') -> .regex(/^(https?:\\/\\/)?[\\w.-]+\\.[a-zA-Z]{2,}([\\/\\w .-]*)*\\/?$/)`,
      () => {
        const result = regex('^(https?:\\/\\/)?[\\w.-]+\\.[a-zA-Z]{2,}([\\/\\w .-]*)*\\/?$')
        const expected = '.regex(/^(https?:\\/\\/)?[\\w.-]+\\.[a-zA-Z]{2,}([\\/\\w .-]*)*\\/?$/)'
        expect(result).toBe(expected)
      },
    )
    it.concurrent(`regex('^\\d{2}/\\d{2}$') -> '.regex(/^\\d{2}\\/\\d{2}$/)'`, () => {
      const result = regex('^\\d{2}/\\d{2}$')
      const expected = '.regex(/^\\d{2}\\/\\d{2}$/)'
      expect(result).toBe(expected)
    })
    it(`regex('^/api/users$') → '.regex(/^\\/api\\/users$/)'`, () => {
      const result = regex('^/api/users$')
      const expected = '.regex(/^\\/api\\/users$/)'
      expect(result).toBe(expected)
    })
  })
})
