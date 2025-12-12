import { describe, expect, it } from 'vitest'
import {
  createRoute,
  escapeStringLiteral,
  getToSafeIdentifier,
  isHttpMethod,
  isRefObject,
  isUniqueContentSchema,
  methodPath,
  normalizeTypes,
  parseCli,
  parseConfig,
  refSchema,
  regex,
  registerComponent,
  requestParamsArray,
  sanitizeIdentifier,
} from '.'

// Test run
// pnpm vitest run ./src/utils/index.test.ts

describe('utils', () => {
  // parseConfig
  describe('parseConfig', () => {
    describe('parseConfig', () => {
      it.concurrent('passes: legacy top-level output mode', () => {
        const result = parseConfig({
          input: 'openapi.yaml',
          'zod-openapi': {
            output: 'routes/index.ts',
            exportType: true,
            exportSchema: true,
          },
          rpc: {
            output: 'rpc/index.ts',
            import: "import { client } from '../index.ts'",
          },
        })
        expect(result).toStrictEqual({
          ok: true,
          value: {
            input: 'openapi.yaml',
            'zod-openapi': { output: 'routes/index.ts', exportType: true, exportSchema: true },
            rpc: {
              output: 'rpc/index.ts',
              import: "import { client } from '../index.ts'",
            },
          },
        })
      })
      it.concurrent('passes: schema+route non-split mode (.ts outputs)', () => {
        const result = parseConfig({
          input: 'openapi.yaml',
          'zod-openapi': {
            exportType: true,
            exportSchema: false,
            schema: {
              output: 'src/schemas/index.ts',
              exportType: true,
            },
            route: {
              output: 'src/routes/index.ts',
              import: '../schemas',
            },
          },
          rpc: {
            output: 'src/rpc/index.ts',
            import: '../client',
          },
        })
        expect(result.ok).toBe(true)
      })
      it.concurrent('passes: schema+route split mode (dir outputs) + rpc split dir', () => {
        const result = parseConfig({
          input: 'openapi.json',
          'zod-openapi': {
            schema: {
              output: 'src/schemas', // dir
              split: true,
            },
            route: {
              output: 'src/routes', // dir
              import: '../schemas',
              split: true,
            },
          },
          rpc: {
            output: 'src/rpc', // dir
            import: '../client',
            split: true,
          },
        })
        expect(result.ok).toBe(true)
      })
      it.concurrent('fails: XOR - schema only (route missing)', () => {
        const result = parseConfig({
          input: 'openapi.yaml',
          'zod-openapi': {
            schema: { output: 'src/schemas/index.ts' },
          },
        })
        expect(result).toStrictEqual({
          ok: false,
          error:
            "Invalid config: 'zod-openapi.schema' and 'zod-openapi.route' must be defined together (both or neither).",
        })
      })
      it.concurrent('fails: XOR - route only (schema missing)', () => {
        const result = parseConfig({
          input: 'openapi.yaml',
          'zod-openapi': {
            route: { output: 'src/routes/index.ts', import: '../schemas' },
          },
        })
        expect(result).toStrictEqual({
          ok: false,
          error:
            "Invalid config: 'zod-openapi.schema' and 'zod-openapi.route' must be defined together (both or neither).",
        })
      })
      it.concurrent('fails: schema+route present but top-level output also set', () => {
        const result = parseConfig({
          input: 'openapi.yaml',
          'zod-openapi': {
            output: 'routes/index.ts',
            schema: { output: 'src/schemas/index.ts' },
            route: { output: 'src/routes/index.ts', import: '../schemas' },
          },
        })
        expect(result).toStrictEqual({
          ok: false,
          error:
            "Invalid config: When using 'zod-openapi.schema' or 'zod-openapi.route', do NOT set 'zod-openapi.output'.",
        })
      })
      it.concurrent('fails: legacy top-level output not .ts', () => {
        const result = parseConfig({
          input: 'openapi.yaml',
          'zod-openapi': {
            // biome-ignore lint: test
            output: 'routes/' as any, // not .ts
          },
        })
        expect(result).toStrictEqual({
          ok: false,
          error: 'Invalid output format for zod-openapi: routes/',
        })
      })
      it.concurrent('fails: schema.split=true but .ts file given', () => {
        const result = parseConfig({
          input: 'openapi.yaml',
          'zod-openapi': {
            schema: { output: 'src/schemas/index.ts', split: true },
            route: { output: 'src/routes', import: '../schemas', split: true },
          },
        })
        expect(result).toStrictEqual({
          ok: false,
          error:
            'Invalid schema output path for split mode (must be a directory, not .ts): src/schemas/index.ts',
        })
      })
      it.concurrent('fails: schema non-split but output not .ts', () => {
        const result = parseConfig({
          input: 'openapi.yaml',
          'zod-openapi': {
            schema: { output: 'src/schemas' },
            route: { output: 'src/routes/index.ts', import: '../schemas' },
          },
        })
        expect(result).toStrictEqual({
          ok: false,
          error: 'Invalid schema output path for non-split mode (must be .ts file): src/schemas',
        })
      })
      it.concurrent('fails: route.import not string', () => {
        const result = parseConfig({
          input: 'openapi.yaml',
          'zod-openapi': {
            schema: { output: 'src/schemas/index.ts' },
            // biome-ignore lint: test
            route: { output: 'src/routes/index.ts', import: 123 as any },
          },
        })
        expect(result).toStrictEqual({
          ok: false,
          error: 'Invalid route import format for zod-openapi: 123',
        })
      })
      it.concurrent('fails: route.split not boolean', () => {
        const result = parseConfig({
          input: 'openapi.yaml',
          'zod-openapi': {
            schema: { output: 'src/schemas/index.ts' },
            route: {
              output: 'src/routes/index.ts',
              import: '../schemas',
              // biome-ignore lint: test
              split: 'yes' as any,
            },
          },
        })
        expect(result).toStrictEqual({
          ok: false,
          error: 'Invalid route split format for zod-openapi: yes',
        })
      })
      it.concurrent('fails: route non-split but output not .ts', () => {
        const result = parseConfig({
          input: 'openapi.yaml',
          'zod-openapi': {
            schema: { output: 'src/schemas/index.ts' },
            route: { output: 'src/routes/', import: '../schemas' },
          },
        })
        expect(result).toStrictEqual({
          ok: false,
          error: 'Invalid route output path for non-split mode (must be .ts file): src/routes/',
        })
      })
      it.concurrent('fails: route.split=true but .ts file given', () => {
        const result = parseConfig({
          input: 'openapi.json',
          'zod-openapi': {
            schema: { output: 'src/schemas', split: true },
            route: { output: 'src/routes/index.ts', import: '../schemas', split: true },
          },
        })
        expect(result).toStrictEqual({
          ok: false,
          error:
            'Invalid route output path for split mode (must be a directory, not .ts): src/routes/index.ts',
        })
      })
      it.concurrent('fails: zod-openapi.exportSchema not boolean', () => {
        const result = parseConfig({
          input: 'openapi.json',
          'zod-openapi': {
            output: 'routes/index.ts',
            // biome-ignore lint: test
            exportSchema: 'true' as any,
          },
        })
        expect(result).toStrictEqual({
          ok: false,
          error: 'Invalid exportSchema format for zod-openapi: true',
        })
      })
      it.concurrent('fails: zod-openapi.exportType not boolean', () => {
        const result = parseConfig({
          input: 'openapi.json',
          'zod-openapi': {
            output: 'routes/index.ts',
            // biome-ignore lint: test
            exportType: 1 as any,
          },
        })
        expect(result).toStrictEqual({
          ok: false,
          error: 'Invalid exportType format for zod-openapi: 1',
        })
      })
      it.concurrent('fails: schema.exportType not boolean', () => {
        const result = parseConfig({
          input: 'openapi.json',
          'zod-openapi': {
            schema: {
              output: 'src/schemas/index.ts',
              // biome-ignore lint: test
              exportType: 'yes' as any,
            },
            route: { output: 'src/routes/index.ts', import: '../schemas' },
          },
        })
        expect(result).toStrictEqual({
          ok: false,
          error: 'Invalid schema exportType format for zod-openapi: yes',
        })
      })
      // type
      it.concurrent('passes: type.output is .d.ts', () => {
        const result = parseConfig({
          input: 'openapi.yaml',
          type: { output: 'src/rpc/index.d.ts' },
        })
        expect(result).toStrictEqual({
          ok: true,
          value: {
            input: 'openapi.yaml',
            type: { output: 'src/rpc/index.d.ts' },
          },
        })
      })
      it.concurrent('fails: type.output not .d.ts', () => {
        const result = parseConfig({
          input: 'openapi.yaml',
          // biome-ignore lint: test
          type: { output: 42 as any },
        })
        expect(result).toStrictEqual({
          ok: false,
          error: 'Invalid type output format: 42 (must be .ts file)',
        })
      })
      it.concurrent('fails: rpc.output not string', () => {
        const result = parseConfig({
          input: 'openapi.yaml',
          'zod-openapi': { output: 'routes/index.ts' },
          rpc: {
            // biome-ignore lint: test
            output: 42 as any,
            import: '../client',
          },
        })
        expect(result).toStrictEqual({
          ok: false,
          error: 'Invalid output format for rpc: 42',
        })
      })
      it.concurrent('fails: rpc.import not string', () => {
        const result = parseConfig({
          input: 'openapi.yaml',
          'zod-openapi': { output: 'routes/index.ts' },
          rpc: {
            output: 'rpc/index.ts',
            // biome-ignore lint: test
            import: true as any,
          },
        })
        expect(result).toStrictEqual({
          ok: false,
          error: 'Invalid import format for rpc: true',
        })
      })

      it.concurrent('fails: rpc.split not boolean', () => {
        const result = parseConfig({
          input: 'openapi.json',
          'zod-openapi': { output: 'routes/index.ts' },
          rpc: {
            output: 'rpc/index.ts',
            import: '../client',
            // biome-ignore lint: test
            split: 'nope' as any,
          },
        })
        expect(result).toStrictEqual({
          ok: false,
          error: 'Invalid split format for rpc: nope',
        })
      })
      it.concurrent('fails: rpc split mode but .ts output given', () => {
        const result = parseConfig({
          input: 'openapi.json',
          'zod-openapi': { output: 'routes/index.ts' },
          rpc: {
            output: 'rpc/index.ts',
            import: '../client',
            split: true,
          },
        })
        expect(result).toStrictEqual({
          ok: false,
          error:
            'Invalid rpc output path for split mode (must be a directory, not .ts): rpc/index.ts',
        })
      })
      it.concurrent('fails: rpc non-split but output not .ts', () => {
        const result = parseConfig({
          input: 'openapi.json',
          'zod-openapi': { output: 'routes/index.ts' },
          rpc: {
            output: 'rpc/',
            import: '../client',
          },
        })
        expect(result).toStrictEqual({
          ok: false,
          error: 'Invalid output format for rpc (non-split mode must be .ts file): rpc/',
        })
      })
      it.concurrent('fails: invalid input extension (.yml is not allowed)', () => {
        const result = parseConfig({
          // biome-ignore lint: test
          input: 'openapi.yml' as any,
          'zod-openapi': { output: 'routes/index.ts' },
        })
        expect(result).toStrictEqual({
          ok: false,
          error: 'Invalid input: openapi.yml (must be .yaml | .json | .tsp)',
        })
      })
    })
  })
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
  /* ========================================================================== *
   *  Handler Utilities
   *    └─ Everything below relates to generating, grouping, or importing route
   *       handler functions.
   * ========================================================================== */
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
