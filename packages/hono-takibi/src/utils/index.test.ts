import { describe, expect, it } from 'vitest'
import {
  configToTarget,
  ensureSuffix,
  escapeStringLiteral,
  findSchema,
  getToSafeIdentifier,
  isHttpMethod,
  isRecord,
  isRefObject,
  isUniqueContentSchema,
  lowerFirst,
  methodPath,
  normalizeTypes,
  parseCli,
  parseConfig,
  refSchema,
  regex,
  registerComponent,
  requestParamsArray,
  sanitizeIdentifier,
  toIdentifier,
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
            exportSchemasTypes: true,
            exportSchemas: true,
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
            'zod-openapi': {
              output: 'routes/index.ts',
              exportSchemasTypes: true,
              exportSchemas: true,
            },
            rpc: {
              output: 'rpc/index.ts',
              import: "import { client } from '../index.ts'",
            },
          },
        })
      })
      it.concurrent('passes: schemas+routes non-split mode (.ts outputs)', () => {
        const result = parseConfig({
          input: 'openapi.yaml',
          'zod-openapi': {
            exportSchemasTypes: true,
            exportSchemas: false,
            components: {
              schemas: {
                output: 'src/schemas/index.ts',
                import: '../schemas',
                exportTypes: true,
              },
            },
            routes: {
              output: 'src/routes/index.ts',
            },
          },
          rpc: {
            output: 'src/rpc/index.ts',
            import: '../client',
          },
        })
        expect(result.ok).toBe(true)
      })
      it.concurrent('passes: schemas+routes split mode (dir outputs) + rpc split dir', () => {
        const result = parseConfig({
          input: 'openapi.json',
          'zod-openapi': {
            components: {
              schemas: {
                output: 'src/schemas', // dir
                split: true,
              },
            },
            routes: {
              output: 'src/routes', // dir
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
      it.concurrent('fails: schemas.split=true but .ts file given', () => {
        const result = parseConfig({
          input: 'openapi.yaml',
          'zod-openapi': {
            components: {
              schemas: { output: 'src/schemas/index.ts', split: true },
            },
            routes: { output: 'src/routes', split: true },
          },
        })
        expect(result).toStrictEqual({
          ok: false,
          error:
            'Invalid schemas output path for split mode (must be a directory, not .ts): src/schemas/index.ts',
        })
      })
      it.concurrent('fails: schemas non-split but output not .ts', () => {
        const result = parseConfig({
          input: 'openapi.yaml',
          'zod-openapi': {
            components: {
              schemas: { output: 'src/schemas' },
            },
            routes: { output: 'src/routes/index.ts' },
          },
        })
        expect(result).toStrictEqual({
          ok: false,
          error: 'Invalid schemas output path for non-split mode (must be .ts file): src/schemas',
        })
      })
      it.concurrent('fails: schemas.import not string', () => {
        const result = parseConfig({
          input: 'openapi.yaml',
          'zod-openapi': {
            components: {
              schemas: {
                output: 'src/schemas/index.ts',
                // @ts-expect-error - test invalid import
                import: 123,
              },
            },
            routes: { output: 'src/routes/index.ts' },
          },
        })
        expect(result).toStrictEqual({
          ok: false,
          error: 'Invalid import format for components.schemas: 123',
        })
      })
      it.concurrent('fails: routes.split not boolean', () => {
        const result = parseConfig({
          input: 'openapi.yaml',
          'zod-openapi': {
            components: {
              schemas: { output: 'src/schemas/index.ts' },
            },
            routes: {
              output: 'src/routes/index.ts',
              // @ts-expect-error - test invalid boolean
              split: 'yes',
            },
          },
        })

        expect(result).toStrictEqual({
          ok: false,
          error: 'Invalid split format for routes: yes',
        })
      })
      it.concurrent('fails: routes non-split but output not .ts', () => {
        const result = parseConfig({
          input: 'openapi.yaml',
          'zod-openapi': {
            routes: { output: 'src/routes/index.ts', split: true },
          },
        })
        expect(result).toStrictEqual({
          ok: false,
          error:
            'Invalid routes output path for split mode (must be a directory, not .ts): src/routes/index.ts',
        })
      })
      it.concurrent('fails: routes.split=true but .ts file given', () => {
        const result = parseConfig({
          input: 'openapi.json',
          'zod-openapi': {
            components: {
              schemas: { output: 'src/schemas/index.ts', split: true },
            },
          },
        })
        expect(result).toStrictEqual({
          ok: false,
          error:
            'Invalid schemas output path for split mode (must be a directory, not .ts): src/schemas/index.ts',
        })
      })
      it.concurrent('fails: zod-openapi.exportSchemas not boolean', () => {
        const result = parseConfig({
          input: 'openapi.json',
          'zod-openapi': {
            output: 'routes/index.ts',
            // @ts-expect-error - test invalid boolean
            exportSchemas: 'true',
          },
        })
        expect(result).toStrictEqual({
          ok: false,
          error: 'Invalid exportSchemas format for zod-openapi: true',
        })
      })
      it.concurrent('fails: zod-openapi.exportSchemasTypes not boolean', () => {
        const result = parseConfig({
          input: 'openapi.json',
          'zod-openapi': {
            output: 'routes/index.ts',
            // @ts-expect-error - test invalid boolean
            exportSchemasTypes: 1,
          },
        })
        expect(result).toStrictEqual({
          ok: false,
          error: 'Invalid exportSchemasTypes format for zod-openapi: 1',
        })
      })
      it.concurrent('fails: schemas.exportTypes not boolean', () => {
        const result = parseConfig({
          input: 'openapi.json',
          'zod-openapi': {
            components: {
              schemas: {
                output: 'src/schemas/index.ts',
                // @ts-expect-error - test invalid boolean
                exportTypes: 'yes',
              },
            },
            routes: { output: 'src/routes/index.ts' },
          },
        })
        expect(result).toStrictEqual({
          ok: false,
          error: 'Invalid exportTypes format for components.schemas: yes',
        })
      })
      //   // type
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
          // @ts-expect-error - test invalid output
          type: { output: 42 },
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
            // @ts-expect-error - test invalid output
            output: 42,
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
            // @ts-expect-error - test invalid import
            import: true,
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
            // @ts-expect-error - test invalid boolean
            split: 'nope',
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
          // @ts-expect-error - test invalid input extension
          input: 'openapi.yml',
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
          exportSchemasTypes: false,
          exportSchemas: false,
          exportParametersTypes: false,
          exportParameters: false,
          exportSecuritySchemes: false,
          exportRequestBodies: false,
          exportResponses: false,
          exportHeadersTypes: false,
          exportHeaders: false,
          exportExamples: false,
          exportLinks: false,
          exportCallbacks: false,
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
        '--export-schemas-types',
        '--export-schemas',
        '--export-parameters-types',
        '--export-parameters',
        '--export-security-schemes',
        '--export-request-bodies',
        '--export-responses',
        '--export-headers-types',
        '--export-headers',
        '--export-examples',
        '--export-links',
        '--export-callbacks',
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
          exportSchemasTypes: true,
          exportSchemas: true,
          exportParametersTypes: true,
          exportParameters: true,
          exportSecuritySchemes: true,
          exportRequestBodies: true,
          exportResponses: true,
          exportHeadersTypes: true,
          exportHeaders: true,
          exportExamples: true,
          exportLinks: true,
          exportCallbacks: true,
          template: true,
          test: true,
          basePath: '/api/v1',
        },
      })
    })
  })
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
  // isRecord
  describe('isRecord Test', () => {
    it.concurrent.each([
      [{ key: 'value' }, true],
      [{ type: 'object' }, true],
      [[], true],
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
  // refName
  describe('refSchema', () => {
    it.concurrent(`refSchema('#/components/schemas/Test') -> 'TestSchema'`, () => {
      expect(refSchema('#/components/schemas/Test')).toBe('TestSchema')
    })
    it.concurrent(`refSchema('#/components/parameters/Test') -> 'TestParamsSchema'`, () => {
      expect(refSchema('#/components/parameters/Test')).toBe('TestParamsSchema')
    })
    it.concurrent(`refSchema('#/components/headers/Test') -> 'TestHeaderSchema'`, () => {
      expect(refSchema('#/components/headers/Test')).toBe('TestHeaderSchema')
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
  // toIdentifier
  describe('toIdentifier', () => {
    it.concurrent.each([
      ['test', 'test'],
      ['test123', 'test123'],
      ['_test', '_test'],
      ['$test', '$test'],
      ['foo-bar', 'foo_bar'],
      ['foo@bar!baz', 'foo_bar_baz'],
      ['post.title', 'post_title'],
      ['テスト', '___'],
      ['', '_'],
      ['123startWithNumber', '_123startWithNumber'],
    ])(`toIdentifier('%s') -> '%s'`, (input, expected) => {
      expect(toIdentifier(input)).toBe(expected)
    })
  })
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
  // findSchema
  describe('findSchema', () => {
    it.concurrent('findSchema ErrorSchema', () => {
      const result = findSchema(
        'export const BadRequestResponse = {description:"Bad Request",content:{"application/json":{schema:ErrorSchema,examples:{"badRequestExample":BadRequestExample}}}}',
      )
      expect(result).toStrictEqual(['ErrorSchema'])
    })

    it.concurrent('findSchema LimitSchema', () => {
      const result =
        findSchema(`export const LimitSchema = z.int32().min(1).max(100).default(20).openapi({param:{in:"query",name:"limit",required:false}})

export type Limit = z.infer<typeof LimitSchema>`)
      expect(result).toStrictEqual(['LimitSchema'])
    })
  })
  // lowerFirst
  describe('lowerFirst', () => {
    it.concurrent.each([
      ['test', 'test'],
      ['Test', 'test'],
      ['TEST', 'tEST'],
      ['', ''],
    ])(`lowerFirst('%s') -> '%s'`, (input, expected) => {
      expect(lowerFirst(input)).toBe(expected)
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
  // configToTarget
  describe('configToTarget', () => {
    it.concurrent('returns undefined for undefined config', () => {
      const result = configToTarget(undefined)
      expect(result).toBeUndefined()
    })
    it.concurrent('creates target from config object', () => {
      const result = configToTarget({ output: 'src/schemas/index.ts' })
      expect(result).toStrictEqual({ output: 'src/schemas/index.ts' })
    })
    it.concurrent('creates target with all options', () => {
      const result = configToTarget({
        output: 'src/schemas',
        split: true,
        import: '@packages/schemas',
      })
      expect(result).toStrictEqual({
        output: 'src/schemas',
        split: true,
        import: '@packages/schemas',
      })
    })
    it.concurrent('applies transform to output path', () => {
      const result = configToTarget({ output: 'schemas' }, (p) => `/abs/${p}`)
      expect(result).toStrictEqual({ output: '/abs/schemas' })
    })
    it.concurrent('preserves split and import with transform', () => {
      const result = configToTarget(
        { output: 'schemas', split: true, import: '@packages/schemas' },
        (p) => `/abs/${p}`,
      )
      expect(result).toStrictEqual({
        output: '/abs/schemas',
        split: true,
        import: '@packages/schemas',
      })
    })
  })
})
