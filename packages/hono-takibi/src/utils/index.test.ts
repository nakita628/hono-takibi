import { describe, expect, it } from 'vitest'
import {
  _default,
  applyOpenapiRoutes,
  appRouteHandler,
  array,
  coerce,
  createRoute,
  escapeStringLiteral,
  formatRequestObject,
  getFlagValue,
  getHandlerImports,
  getToSafeIdentifier,
  groupHandlersByFileName,
  gt,
  handler,
  hasFlag,
  importHandlers,
  importMap,
  importRoutes,
  insertRequestBody,
  intersection,
  isAllOptional,
  isArrayWithSchemaReference,
  isHelpRequested,
  isHttpMethod,
  isNullableSchema,
  isRefObject,
  isTs,
  isUniqueContentSchema,
  isYamlOrJsonOrTsp,
  length,
  lt,
  max,
  min,
  partial,
  refName,
  regex,
  registerComponent,
  removeMaxIfLtExists,
  removeMinIfGtExists,
  removeMinMaxIfEqual,
  requestParams,
  routeName,
  sanitizeIdentifier,
  schema,
  sliceArgv,
  stringbool,
  union,
} from '.'

// Test run
// pnpm vitest run ./src/utils/index.test.ts

describe('utils', () => {
  // getFlagValue
  describe('getFlagVal', () => {
    it('should get value for --naming-case-schema', () => {
      const args = [
        '--naming-case-schema',
        'PascalCase',
        '--export-schema',
        '--naming-case-type',
        'camelCase',
        '--export-type',
      ]
      expect(getFlagValue(args, '--naming-case-schema')).toBe('PascalCase')
      expect(getFlagValue(args, '--naming-case-type')).toBe('camelCase')
    })
    it('should return undefined for boolean flag', () => {
      const args = [
        '--naming-case-schema',
        'PascalCase',
        '--export-schema',
        '--naming-case-type',
        'camelCase',
        '--export-type',
      ]
      expect(getFlagValue(args, '--export-schema')).toBeUndefined()
      expect(getFlagValue(args, '--export-type')).toBeUndefined()
    })
  })
  // hasFlag
  describe('hasFlag', () => {
    it.concurrent(`hasFlag(['--debug'], '--debug') -> true`, () => {
      const args = ['--debug']
      expect(hasFlag(args, '--debug')).toBe(true)
    })
    it.concurrent(`hasFlag(['--verbose', '--debug'], '--debug') -> true`, () => {
      const args = ['--verbose', '--debug']
      expect(hasFlag(args, '--debug')).toBe(true)
    })
    it.concurrent(`hasFlag(['--verbose'], '--debug') -> false`, () => {
      const args = ['--verbose']
      expect(hasFlag(args, '--debug')).toBe(false)
    })
    it.concurrent(`hasFlag([], '--debug') -> false`, () => {
      const args: string[] = []
      expect(hasFlag(args, '--debug')).toBe(false)
    })
    it.concurrent(`hasFlag(['--debug=true'], '--debug') -> false`, () => {
      const args = ['--debug=true']
      expect(hasFlag(args, '--debug')).toBe(false)
    })
  })
  // isHelpRequested
  describe('isHelpRequested', () => {
    it('returns true for ["--help"]', () => {
      expect(isHelpRequested(['--help'])).toBe(true)
    })
    it('returns true for ["-h"]', () => {
      expect(isHelpRequested(['-h'])).toBe(true)
    })
    it('returns false for other arguments only', () => {
      expect(isHelpRequested(['--foo'])).toBe(false)
      expect(isHelpRequested(['input.yaml', '-o', 'output.ts'])).toBe(false)
      expect(isHelpRequested(['--export-type'])).toBe(false)
    })
    it('returns false for --help or -h mixed with other arguments', () => {
      expect(isHelpRequested(['input.yaml', '--help'])).toBe(false)
      expect(isHelpRequested(['-h', '--foo'])).toBe(false)
      expect(isHelpRequested(['--help', '--foo'])).toBe(false)
      expect(isHelpRequested(['--foo', '--help'])).toBe(false)
    })
  })
  // sliceArgv
  describe('sliceArgv', () => {
    it(`sliceArgv(['**/bin/node', '**/dist/index.js', '-o']) -> ['-o']`, () => {
      const argv = ['**/bin/node', '**/dist/index.js', '-o']
      expect(sliceArgv(argv)).toStrictEqual(['-o'])
    })
    it(`sliceArgv(['**/bin/node', '**/dist/index.js', '-h']) -> ['-h']`, () => {
      const argv = ['**/bin/node', '**/dist/index.js', '-h']
      expect(sliceArgv(argv)).toStrictEqual(['-h'])
    })
    it(`sliceArgv(['**/bin/node', '**/dist/index.js', '-h']) -> ['-help']`, () => {
      const argv = ['**/bin/node', '**/dist/index.js', '-help']
      expect(sliceArgv(argv)).toStrictEqual(['-help'])
    })
  })
  // isTs
  describe('isTs', () => {
    it('should return true for .ts files', () => {
      expect(isTs('index.ts')).toBe(true)
      expect(isTs('src/app.ts')).toBe(true)
    })

    it('should return false for .d.ts files', () => {
      expect(isTs('types.d.ts')).toBe(false)
      expect(isTs('src/types/global.d.ts')).toBe(false)
    })

    it('should return false for non-.ts files', () => {
      expect(isTs('style.css')).toBe(false)
      expect(isTs('main.js')).toBe(false)
    })

    it('should return false for uppercase .TS', () => {
      expect(isTs('index.TS')).toBe(false)
    })
  })
  // isYamlOrJsonOrTsp
  describe('isYamlOrJsonOrTsp', () => {
    it('should return true for .yaml files', () => {
      expect(isYamlOrJsonOrTsp('api.yaml')).toBe(true)
    })
    it('should return true for .json files', () => {
      expect(isYamlOrJsonOrTsp('data.json')).toBe(true)
    })
    it('should return false for .yml files', () => {
      expect(isYamlOrJsonOrTsp('config.yml')).toBe(false)
    })
    it('should return false for .ts files', () => {
      expect(isYamlOrJsonOrTsp('index.ts')).toBe(false)
    })
    it('should return false for strings without extension', () => {
      expect(isYamlOrJsonOrTsp('filename')).toBe(false)
    })
    it('should return false for empty string', () => {
      expect(isYamlOrJsonOrTsp('')).toBe(false)
    })
    it('should return true case-sensitively (only lowercase)', () => {
      expect(isYamlOrJsonOrTsp('file.YAML')).toBe(false)
      expect(isYamlOrJsonOrTsp('file.JSON')).toBe(false)
    })
    it('should return true for .tsp files', () => {
      expect(isYamlOrJsonOrTsp('schema.tsp')).toBe(true)
    })
    it('should return false for .txt files', () => {
      expect(isYamlOrJsonOrTsp('document.txt')).toBe(false)
    })
  })
  /* ========================================================================== *
   *  Handler-Generation Utilities
   * ========================================================================== */
  // appRouteHandler
  describe('appRouteHandler', () => {
    it.concurrent(
      `appRouteHandler('getRoute', 'getRouteHandler') -> .openapi(getRoute,getRouteHandler)`,
      () => {
        const result = appRouteHandler('getRoute', 'getRouteHandler')
        const expected = '.openapi(getRoute,getRouteHandler)'
        expect(result).toBe(expected)
      },
    )
  })
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
      const expected = `app.openAPIRegistry.registerComponent('securitySchemes', 'jwt', ${JSON.stringify(
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
  // applyOpenapiRoutes
  describe('applyOpenapiRoutes', () => {
    it.concurrent('applyOpenapiRoutes', () => {
      const result = applyOpenapiRoutes([
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
      const expected = `.openapi(getHonoRoute,getHonoRouteHandler)
.openapi(getHonoXRoute,getHonoXRouteHandler)
.openapi(getZodOpenapiHonoRoute,getZodOpenapiHonoRouteHandler)`
      expect(result).toBe(expected)
    })
  })
  /* ========================================================================== *
   *  Handler Utilities
   *    └─ Everything below relates to generating, grouping, or importing route
   *       handler functions.
   * ========================================================================== */
  // handler
  describe('handler', () => {
    it.concurrent('generateHandler', () => {
      const result = handler('getRouteHandler', 'getRoute')
      const expected = 'export const getRouteHandler:RouteHandler<typeof getRoute>=async(c)=>{}'
      expect(result).toBe(expected)
    })
  })
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
  /* ========================================================================== *
   *  Schema / Type Predicates
   * ========================================================================== */
  // isAllOptional
  describe('isAllOptional', () => {
    it.concurrent(`isAllOptional(['id:z.string().optional()']) -> true`, () => {
      const result = isAllOptional(['id:z.string().optional()'])
      const expected = true
      expect(result).toBe(expected)
    })
    it.concurrent(`isAllOptional(['id:z.string()']) -> false`, () => {
      const result = isAllOptional(['id:z.string()'])
      const expected = false
      expect(result).toBe(expected)
    })
  })
  // isArrayWithSchemaReference
  describe('isArrayWithSchemaReference', () => {
    it.concurrent('isArrayWithSchemaReference -> true', () => {
      const result = isArrayWithSchemaReference({
        type: 'array',
        items: { $ref: '#/components/schemas/Test' },
      })
      expect(result).toBe(true)
    })
    it.concurrent('isArrayWithSchemaReference -> false', () => {
      const result = isArrayWithSchemaReference({ type: 'string', format: 'binary' })
      expect(result).toBe(false)
    })
    it.concurrent('isArrayWithSchemaReference -> false', () => {
      const result = isArrayWithSchemaReference({
        type: 'array',
        items: undefined,
      })
      expect(result).toBe(false)
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
  // isNullableSchema
  describe('isNullableSchema Test', () => {
    it.concurrent('isNullableSchema -> true', () => {
      const result = isNullableSchema({
        nullable: true,
      })
      const expected = true
      expect(result).toBe(expected)
    })
    it.concurrent('isNullableSchema -> false', () => {
      const result = isNullableSchema({
        type: 'object',
        properties: {
          test: {
            type: 'string',
          },
        },
      })
      const expected = false
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
  // requestParams
  describe('requestParams', () => {
    it.concurrent('requestParams("") -> "request:{},",', () => {
      const result = requestParams('')
      const expected = 'request:{},'
      expect(result).toBe(expected)
    })

    it.concurrent(`requestParams("key:'value',") -> "request:{key:'value',},"`, () => {
      const result = requestParams("key:'value',")
      const expected = "request:{key:'value',},"
      expect(result).toBe(expected)
    })

    it.concurrent(
      `requestParams("key1:'value1',key2:'value2',") -> "request:{key1:'value1',key2:'value2',},"`,
      () => {
        const result = requestParams("key1:'value1',key2:'value2',")
        const expected = "request:{key1:'value1',key2:'value2',},"
        expect(result).toBe(expected)
      },
    )
    it.concurrent(
      `requestParams("key:'value', // comment") -> "request:{key:'value', // comment},"`,
      () => {
        const result = requestParams("key:'value', // comment")
        const expected = "request:{key:'value', // comment},"
        expect(result).toBe(expected)
      },
    )

    it.concurrent(
      `requestParams("specialChars:'!@#$%^&*()',") -> "request:{specialChars:'!@#$%^&*()',},"`,
      () => {
        const result = requestParams("specialChars:'!@#$%^&*()',")
        const expected = "request:{specialChars:'!@#$%^&*()',},"
        expect(result).toBe(expected)
      },
    )
  })
  // insertRequestBody
  describe('insertRequestBody', () => {
    it.concurrent('insertRequestBody Test', () => {
      const result = insertRequestBody(
        'request:{params:z.object({id:z.string().uuid()})},',
        "body:{required:true,content:{'application/json':{schema:z.object({post:z.string().min(1).max(140)}),},},},",
      )
      const expected =
        "request:{body:{required:true,content:{'application/json':{schema:z.object({post:z.string().min(1).max(140)}),},},},params:z.object({id:z.string().uuid()})},"
      expect(result).toBe(expected)
    })
    it.concurrent('should throw an error when requestParams is undefined', () => {
      // biome-ignore lint: test
      const requestParams = undefined as any
      const requestBodyCode = 'edge case'

      expect(() => insertRequestBody(requestParams, requestBodyCode)).toThrow(
        `Cannot read properties of undefined (reading 'replace')`,
      )
    })
  })
  // formatRequestObject
  describe('formatRequestObject', () => {
    it.concurrent('formatRequestObject Test', () => {
      const result = formatRequestObject(['params:z.object({id:z.string().uuid()})'])
      const expected = 'request:{params:z.object({id:z.string().uuid()})},'
      expect(result).toBe(expected)
    })
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
   *  Zod Chain Optimisation
   * ========================================================================== */
  // removeMaxIfLtExists
  describe('removeMaxIfLtExists', () => {
    it.concurrent(`removeMaxIfLtExists('z.number().max(1).lt(1)', 1) -> 'z.number().lt(1)'`, () => {
      const result = removeMaxIfLtExists('z.number().max(1).lt(1)', 1)
      const expected = 'z.number().lt(1)'
      expect(result).toBe(expected)
    })
  })
  // removeMinIfGtExists
  describe('removeMinIfGtExists', () => {
    it.concurrent(`removeMinIfGtExists('z.number().min(1).gt(1)', 1) -> 'z.number().gt(1)'`, () => {
      const result = removeMinIfGtExists('z.number().min(1).gt(1)', 1)
      const expected = 'z.number().gt(1)'
      expect(result).toBe(expected)
    })
  })
  // removeMinMaxIfEqual
  describe('removeMinMaxIfEqual', () => {
    it.concurrent(`removeMinMaxIfEqual('z.string().min(1).max(1)', 1, 1) -> 'z.string()'`, () => {
      const result = removeMinMaxIfEqual('z.string().min(1).max(1)', 1, 1)
      const expected = 'z.string()'
      expect(result).toBe(expected)
    })
  })
  /* ========================================================================== *
   *  Zod Schema
   * ========================================================================== */
  // array
  describe('array', () => {
    it.concurrent(`array('Test') -> z.array(Test)`, () => {
      const result = array('Test')
      const expected = 'z.array(Test)'
      expect(result).toBe(expected)
    })
    it.concurrent(`array('z.string()') -> z.array(z.string())`, () => {
      const result = array('z.string()')
      const expected = 'z.array(z.string())'
      expect(result).toBe(expected)
    })
    it.concurrent(
      `array('z.object({ name: z.string() })') -> z.array(z.object({ name: z.string() }))`,
      () => {
        const result = array('z.object({ name: z.string() })')
        const expected = 'z.array(z.object({ name: z.string() }))'
        expect(result).toBe(expected)
      },
    )
  })
  // coerce
  describe('coerce', () => {
    it.concurrent(`coerce('z.number()') -> z.coerce.number())`, () => {
      const result = coerce('z.number()')
      const expected = 'z.coerce.number()'
      expect(result).toBe(expected)
    })
    it.concurrent(`coerce('z.number().min(1)') -> z.coerce.number().min(1))`, () => {
      const result = coerce('z.number().min(1)')
      const expected = 'z.coerce.number().min(1)'
      expect(result).toBe(expected)
    })
    it.concurrent(`coerce('z.number().max(10)') -> z.coerce.number().max(10))`, () => {
      const result = coerce('z.number().max(10)')
      const expected = 'z.coerce.number().max(10)'
      expect(result).toBe(expected)
    })
  })
  // _default
  describe('_default Test', () => {
    it.concurrent('_default(1) -> .default(1)', () => {
      const result = _default(1)
      const expected = '.default(1)'
      expect(result).toBe(expected)
    })
    it.concurrent('_default(10) -> .default(10)', () => {
      const result = _default(10)
      const expected = '.default(10)'
      expect(result).toBe(expected)
    })
  })
  // gt
  describe('gt', () => {
    it.concurrent('gt(0) -> .gt(0)', () => {
      const result = gt(0)
      const expected = '.gt(0)'
      expect(result).toBe(expected)
    })
    it.concurrent('gt(10) -> .gt(10)', () => {
      const result = gt(10)
      const expected = '.gt(10)'
      expect(result).toBe(expected)
    })
    it.concurrent('gt(100) -> .gt(100)', () => {
      const result = gt(100)
      const expected = '.gt(100)'
      expect(result).toBe(expected)
    })
  })
  // intersection
  describe('intersection', () => {
    it.concurrent(
      `intersection(['TestSchema', 'z.object({type:z.enum(["A","B","C"])})']) -> z.intersection(TestSchema,z.object({type:z.enum(["A","B","C"])}))`,
      () => {
        const result = intersection(['TestSchema', 'z.object({type:z.enum(["A","B","C"])})'])
        const expected = 'z.intersection(TestSchema,z.object({type:z.enum(["A","B","C"])}))'
        expect(result).toBe(expected)
      },
    )
  })
  // length
  describe('length', () => {
    it.concurrent('length(1) -> .length(1)', () => {
      const result = length(1)
      const expected = '.length(1)'
      expect(result).toBe(expected)
    })
    it.concurrent('length(10) -> .length(10)', () => {
      const result = length(10)
      const expected = '.length(10)'
      expect(result).toBe(expected)
    })
    it.concurrent('length(100) -> .length(100)', () => {
      const result = length(100)
      const expected = '.length(100)'
      expect(result).toBe(expected)
    })
  })
  // lt
  describe('lt', () => {
    it.concurrent('lt(1) -> .lt(1)', () => {
      const result = lt(1)
      const expected = '.lt(1)'
      expect(result).toBe(expected)
    })
    it.concurrent('lt(10) -> .lt(10)', () => {
      const result = lt(10)
      const expected = '.lt(10)'
      expect(result).toBe(expected)
    })
  })

  // max
  describe('max', () => {
    it.concurrent('max(1) -> .max(1)', () => {
      const result = max(1)
      const expected = '.max(1)'
      expect(result).toBe(expected)
    })

    it.concurrent('max(10) -> .max(10)', () => {
      const result = max(10)
      const expected = '.max(10)'
      expect(result).toBe(expected)
    })
  })
  // min
  describe('min', () => {
    it.concurrent('min(1) -> .min(1)', () => {
      const result = min(1)
      const expected = '.min(1)'
      expect(result).toBe(expected)
    })
    it.concurrent('min(10) -> .min(10)', () => {
      const result = min(10)
      const expected = '.min(10)'
      expect(result).toBe(expected)
    })
  })
  // partial
  describe('partial', () => {
    it.concurrent(
      `partial(['test:z.string().optional()']) -> z.object({test:z.string()}).partial()`,
      () => {
        const result = partial(['test:z.string().optional()'])
        const expected = 'z.object({test:z.string()}).partial()'
        expect(result).toBe(expected)
      },
    )
  })
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
  // schema
  describe('schema', () => {
    it.concurrent('schema -> z.object({name:string})', () => {
      const result = schema({
        name: 'string',
      })
      const expected = 'z.object({name:string})'
      expect(result).toBe(expected)
    })
    it.concurrent('schema -> z.object({name:string,age:number})', () => {
      const result = schema({
        name: 'string',
        age: 'number',
      })
      const expected = 'z.object({name:string,age:number})'
      expect(result).toBe(expected)
    })
  })
  // stringBool
  describe('stringBool', () => {
    it.concurrent(`stringbool('z.boolean().optional()') -> 'z.stringbool().optional()'`, () => {
      const result = stringbool('z.boolean().optional()')
      const expected = 'z.stringbool().optional()'
      expect(result).toBe(expected)
    })
  })
  describe('union Test', () => {
    it.concurrent(`union(['A', 'B']) -> z.union([A,B])`, () => {
      const result = union(['A', 'B'])
      const expected = 'z.union([A,B])'
      expect(result).toBe(expected)
    })
  })
})
