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
  methodPath,
  normalizeTypes,
  parseCli,
  parseIO,
  refSchema,
  regex,
  registerComponent,
  requestParamsArray,
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
  // parseIO
  describe('parseIO', () => {
    it('should return ok for valid input', () => {
      expect(parseIO({ input: 'input.yaml', output: 'output.ts' })).toStrictEqual({
        ok: true,
        value: { input: 'input.yaml', output: 'output.ts' },
      })
    })
    it('should return error for invalid input', () => {
      expect(parseIO({ input: 'input.txt', output: 'output.ts' })).toStrictEqual({
        ok: false,
        error: 'input must be a .yaml, .json, or .tsp file',
      })
    })
    it('should return error for invalid output', () => {
      expect(parseIO({ input: 'input.yaml', output: 'output.txt' })).toStrictEqual({
        ok: false,
        error: 'output must be a .ts file',
      })
    })
  })

  /* ========================================================================== *
   *  normalizeTypes
   * ========================================================================== */
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
  // isRefObject
  describe('isRefObject Test', () => {
    it.concurrent.each([
      [{ type: 'object' }, true],
      [{ $ref: '#/components/schemas/Test' }, true],
      ['string', false],
      [1, false],
      [true, false],
      [false, false],
    ])(`isRefObject('%s') -> %s`, (input, expected) => {
      expect(isRefObject(input)).toBe(expected)
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

  // isUniqueContentSchema
  describe('isUniqueContentSchema Test', () => {
    it.concurrent('isUniqueContentSchema -> true', () => {
      const result = isUniqueContentSchema(['application/json'], {
        'application/json': { schema: { $ref: '#/components/schemas/Test' } },
      })
      expect(result).toBe(true)
    })
    it.concurrent('isUniqueContentSchema -> false', () => {
      const result = isUniqueContentSchema(['application/json', 'application/xml'], {
        'application/json': { schema: { $ref: '#/components/schemas/Test' } },
        'application/xml': { schema: { $ref: '#/components/schemas/Example' } },
      })
      expect(result).toBe(false)
    })
  })
  /* ========================================================================== *
   *  OpenAPI $ref
   * ========================================================================== */
  // refName
  describe('refSchema', () => {
    it.concurrent(`refSchema('#/components/schemas/Test') -> 'TestSchema'`, () => {
      expect(refSchema('#/components/schemas/Test')).toBe('TestSchema')
    })
  })
  /* ========================================================================== *
   *  Route Code Generation
   *    • createRoute itself
   *    • utilities that build or modify the `request:{ ... }` object
   * ========================================================================== */

  // methodPath
  describe('methodPath', () => {
    it.concurrent.each([
      ['get', '/', 'getIndex'],
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
    ])(`methodPath('%s', '%s') -> '%s'`, (method, path, expected) => {
      expect(methodPath(method, path)).toBe(expected)
    })
  })
  // createRoute
  describe('createRoute', () => {
    it.concurrent('createRoute Test', () => {
      const result = createRoute({
        routeName: 'postHonoRoute',
        tags: 'tags:["Hono"],',
        method: "method:'post',",
        path: "path:'/hono',",
        operationId: "operationId:'HonoService_create',",
        summary: '',
        description: '',
        security: '',
        requestParams:
          "request:{body:{required:true,content:{'application/json':{schema:HonoSchema}}},},",
        responses:
          "responses:{200:{description:'The request has succeeded.',content:{'application/json':{schema:HonoSchema}}},}",
      })
      const expected = `export const postHonoRoute=createRoute({tags:["Hono"],method:'post',path:'/hono',operationId:'HonoService_create',request:{body:{required:true,content:{'application/json':{schema:HonoSchema}}},},responses:{200:{description:'The request has succeeded.',content:{'application/json':{schema:HonoSchema}}},}})`
      expect(result).toBe(expected)
    })
  })
  /* ========================================================================== *
   *  Request Parameters
   * ========================================================================== */
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

  /* ========================================================================== *
   *  String Escaping
   * ========================================================================== */
  // escapeStringLiteral
  describe('escapeStringLiteral', () => {
    it.concurrent.each([
      ['', ''],
      ["'", "\\'"],
      ["'test", "\\'test"],
      ["It's a test", "It\\'s a test"],
      ['test "string" with quotes', 'test "string" with quotes'],
      ["Retrieve Santa's wishlist for Christmas.", "Retrieve Santa\\'s wishlist for Christmas."],
      ["Santa's wishlist.", "Santa\\'s wishlist."],
      ['back\\slash', 'back\\\\slash'],
      ['full width space', 'full width space'],
      ['multi\nline\ntext', 'multi line text'],
      ['\u200Bhidden', 'hidden'],
      ['   trim me   ', 'trim me'],
      ['\t tabbed', 'tabbed'],
      ['a\nb\tc\u200Bd\uFEFF', 'a b c d'],
    ])(`escapeStringLiteral('%s') -> '%s'`, (input, expected) => {
      expect(escapeStringLiteral(input)).toBe(expected)
    })
  })
  /* ========================================================================== *
   *  Identifier
   * ========================================================================== */
  // getToSafeIdentifier
  describe('getToSafeIdentifier', () => {
    it.concurrent.each([
      ['validName', 'validName'],
      ['_underscore', '_underscore'],
      ['$dollar', '$dollar'],
      ['camelCase123', 'camelCase123'],
      ['has space', '"has space"'],
      ['invalid-name', '"invalid-name"'],
      ['123startWithNumber', '"123startWithNumber"'],
      ['has.dot', '"has.dot"'],
      ['hyphen-ated', '"hyphen-ated"'],
      ['class', 'class'],
      ['function', 'function'],
      ['', '""'],
      [' ', '" "'],
      ['-', '"-"'],
    ])(`getToSafeIdentifier('%s') -> '%s'`, (input, expected) => {
      expect(getToSafeIdentifier(input)).toBe(expected)
    })
  })
  // sanitizeIdentifier
  describe('sanitizeIdentifier', () => {
    it.concurrent.each([
      ['test', 'test'],
      ['test123', 'test123'],
      ['_test', '_test'],
      ['$test', '$test'],
      ['foo-bar', 'foo_bar'],
      ['foo@bar!baz', 'foo_bar_baz'],
      ['post.title', 'post_title'],
      ['テスト', '___'],
      ['', ''],
    ])(`sanitizeIdentifier('%s') -> '%s'`, (input, expected) => {
      expect(sanitizeIdentifier(input)).toBe(expected)
    })
  })
  /* ========================================================================== *
   *  Zod Schema
   * ========================================================================== */
  // regex
  describe('regex', () => {
    it.concurrent.each([
      ['^[a-z]+$', '.regex(/^[a-z]+$/)'],
      ['^\\d{4}-\\d{2}-\\d{2}$', '.regex(/^\\d{4}-\\d{2}-\\d{2}$/)'],
      [
        '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Z|a-z]{2,}$',
        '.regex(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Z|a-z]{2,}$/)',
      ],
      ['^#[0-9a-fA-F]{6}$', '.regex(/^#[0-9a-fA-F]{6}$/)'],
      [
        '^(https?:\\/\\/)?[\\w.-]+\\.[a-zA-Z]{2,}([\\/\\w .-]*)*\\/?$',
        '.regex(/^(https?:\\/\\/)?[\\w.-]+\\.[a-zA-Z]{2,}([\\/\\w .-]*)*\\/?$/)',
      ],
      ['^\\d{2}/\\d{2}$', '.regex(/^\\d{2}\\/\\d{2}$/)'],
      ['^/api/users$', '.regex(/^\\/api\\/users$/)'],
    ])(`regex('%s') -> '%s'`, (input, expected) => {
      expect(regex(input)).toBe(expected)
    })
  })
})
