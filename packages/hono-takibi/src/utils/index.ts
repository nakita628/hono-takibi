/**
 * Parse raw CLI arguments into structured options.
 *
 * - Validates `<input>` ends with `.yaml`/`.json`/`.tsp`
 * - Requires `-o <output.ts>`
 * - Extracts boolean flags for component exports and templates/tests
 * - Extracts optional `--base-path <path>`
 *
 * ```mermaid
 * flowchart TD
 *   A["parseCli(args)"] --> B["Extract input & output (-o)"]
 *   B --> C{"input endsWith .yaml/.json/.tsp AND output endsWith .ts?"}
 *   C -->|No| D["return { ok:false, error:'Usage: hono-takibi ...' }"]
 *   C -->|Yes| E["Read flags (--export-schemas-types, --export-schemas, ..., --template, --test)"]
 *   E --> F["Read optional --base-path value"]
 *   F --> G["return { ok:true, value:{ input, output, flags... } }"]
 * ```
 *
 * @param args - Raw CLI arguments (e.g., `process.argv.slice(2)`).
 * @returns `{ ok:true, value }` on success; `{ ok:false, error }` on invalid usage.
 */
export function parseCli(args: readonly string[]):
  | {
      readonly ok: true
      readonly value: {
        readonly input: `${string}.yaml` | `${string}.json` | `${string}.tsp`
        readonly output: `${string}.ts`
        readonly template: boolean
        readonly test: boolean
        readonly basePath: string
        readonly componentsOptions: {
          readonly exportSchemas: boolean
          readonly exportSchemasTypes: boolean
          readonly exportParameters: boolean
          readonly exportParametersTypes: boolean
          readonly exportSecuritySchemes: boolean
          readonly exportRequestBodies: boolean
          readonly exportResponses: boolean
          readonly exportHeaders: boolean
          readonly exportHeadersTypes: boolean
          readonly exportExamples: boolean
          readonly exportLinks: boolean
          readonly exportCallbacks: boolean
        }
      }
    }
  | {
      readonly ok: false
      readonly error: string
    } {
  const input = args[0]
  const oIdx = args.indexOf('-o')
  const output = oIdx !== -1 ? args[oIdx + 1] : undefined
  /** yaml or json or tsp */
  const isYamlOrJsonOrTsp = (
    i: string,
  ): i is `${string}.yaml` | `${string}.json` | `${string}.tsp` =>
    i.endsWith('.yaml') || i.endsWith('.json') || i.endsWith('.tsp')
  const isTs = (o: string): o is `${string}.ts` => o.endsWith('.ts')
  const getFlagValue = (args: readonly string[], flag: string): string | undefined => {
    const idx = args.indexOf(flag)
    if (idx !== -1 && args[idx + 1] && !args[idx + 1].startsWith('-')) return args[idx + 1]
    return undefined
  }
  if (!(input && output && isYamlOrJsonOrTsp(input) && isTs(output))) {
    return {
      ok: false,
      error: 'Usage: hono-takibi <input.{yaml,json,tsp}> -o <routes.ts> [options]',
    }
  }
  return {
    ok: true,
    value: {
      input,
      output,
      template: args.includes('--template'),
      test: args.includes('--test'),
      basePath: getFlagValue(args, '--base-path') ?? '/', // default: /
      componentsOptions: {
        exportSchemas: args.includes('--export-schemas') ?? false,
        exportSchemasTypes: args.includes('--export-schemas-types') ?? false,
        exportParameters: args.includes('--export-parameters') ?? false,
        exportParametersTypes: args.includes('--export-parameters-types') ?? false,
        exportSecuritySchemes: args.includes('--export-security-schemes') ?? false,
        exportRequestBodies: args.includes('--export-request-bodies') ?? false,
        exportResponses: args.includes('--export-responses') ?? false,
        exportHeaders: args.includes('--export-headers') ?? false,
        exportHeadersTypes: args.includes('--export-headers-types') ?? false,
        exportExamples: args.includes('--export-examples') ?? false,
        exportLinks: args.includes('--export-links') ?? false,
        exportCallbacks: args.includes('--export-callbacks') ?? false,
      },
    },
  }
}

/**
 * Normalize a JSON Schema `type` value into an array of type strings.
 *
 * @param t - JSON Schema `type` as a single value or an array of values.
 * @returns A flat array of type strings.
 */
export function normalizeTypes(
  t?:
    | 'string'
    | 'number'
    | 'integer'
    | 'date'
    | 'boolean'
    | 'array'
    | 'object'
    | 'null'
    | [
        'string' | 'number' | 'integer' | 'date' | 'boolean' | 'array' | 'object' | 'null',
        ...('string' | 'number' | 'integer' | 'date' | 'boolean' | 'array' | 'object' | 'null')[],
      ],
) {
  return t === undefined ? [] : Array.isArray(t) ? t : [t]
}

/**
 * Generates registration code for OpenAPI `securitySchemes`.
 *
 * @param securitySchemes - Record of scheme name to scheme properties.
 * @returns Multiline string of registration statements.
 */
export function registerComponent(securitySchemes: Record<string, unknown>): string {
  return Object.entries(securitySchemes)
    .map(([name, scheme]) => {
      return `app.openAPIRegistry.registerComponent('securitySchemes','${name}',${JSON.stringify(scheme)})`
    })
    .join('\n')
}

/**
 * Checks if a value is a non-null object (record-like).
 *
 * @param value - The value to check.
 * @returns `true` if the value is a non-null object.
 *
 * @example
 * ```ts
 * isRecord({ key: 'value' }) // true
 * isRecord(null)             // false
 * isRecord('text')           // false
 * isRecord([])               // true (arrays are objects)
 * ```
 */
export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

/**
 * Checks if a value is a non-null object (e.g., a potential `$ref` object).
 *
 * @param value - The value to check.
 * @returns `true` if the value is a non-null object.
 *
 * @example
 * ```ts
 * isRefObject({ $ref: '#/components/schemas/User' }) // true
 * isRefObject(null)                                  // false
 * isRefObject('text')                                // false
 * ```
 */
export function isRefObject(value: unknown): value is {
  readonly $ref?: string
  readonly [key: string]: unknown
} {
  return typeof value === 'object' && value !== null
}

/**
 * Checks if a string is a valid HTTP method.
 *
 * @param method - The HTTP method to check.
 * @returns `true` if the method is a valid HTTP method; otherwise `false`.
 */
export function isHttpMethod(
  method: string,
): method is 'get' | 'put' | 'post' | 'delete' | 'patch' | 'options' | 'head' | 'trace' {
  return (
    method === 'get' ||
    method === 'put' ||
    method === 'post' ||
    method === 'delete' ||
    method === 'patch' ||
    method === 'options' ||
    method === 'head' ||
    method === 'trace'
  )
}

/**
 * Checks if all given content types share the same schema definition.
 *
 * @param contentTypes - Array of content type keys (e.g., ['application/json', 'application/xml']).
 * @param content - OpenAPI content object mapping content types to media objects.
 * @returns `true` if all specified content types refer to the same schema; otherwise `false`.
 *
 * @example
 * ```ts
 * isUniqueContentSchema(['application/json', 'application/xml'], {
 *   'application/json': { schema: { type: 'string' } },
 *   'application/xml': { schema: { type: 'string' } },
 * }) // true
 * ```
 */
export function isUniqueContentSchema(
  contentTypes: readonly string[],
  content: {
    readonly [key: string]: {
      readonly schema: {
        readonly $ref?:
          | `#/components/schemas/${string}`
          | `#/components/parameters/${string}`
          | `#/components/securitySchemes/${string}`
          | `#/components/requestBodies/${string}`
          | `#/components/responses/${string}`
          | `#/components/headers/${string}`
          | `#/components/examples/${string}`
          | `#/components/links/${string}`
          | `#/components/callbacks/${string}`
      }
    }
  },
): boolean {
  const schema = new Set(contentTypes.map((type) => JSON.stringify(content?.[type].schema)))
  return schema.size === 1
}

/**
 * Generates a PascalCase route name from HTTP method and path.
 *
 * @param method - HTTP method (e.g., 'get', 'post').
 * @param path - URL path (e.g., '/users/{id}/posts').
 * @returns A route name string (e.g., 'getUsersIdPostsRoute').
 *
 * @example
 * methodPath('get', '/users/{id}/posts') // 'getUsersIdPosts'
 */
export function methodPath(method: string, path: string): string {
  // 1. api_path: `/user/createWithList`
  // 2. replace(/[\/{}-]/g, ' ') -> ` user createWithList`
  // 3. trim() -> `user createWithList`
  // 4. split(/\s+/) -> `['user', 'createWithList']`
  // 5. map((str) => `${str.charAt(0).toUpperCase()}${str.slice(1)}`) -> `['User', 'CreateWithList']`
  // 6. join('') -> `UserCreateWithList`
  const apiPath = path
    .replace(/[/{}._-]/g, ' ')
    .trim()
    .split(/\s+/)
    .map((str) => `${str.charAt(0).toUpperCase()}${str.slice(1)}`)
    .join('')
  return apiPath ? `${method}${apiPath}` : `${method}`
}

/**
 * Generates an array of Zod validator strings from OpenAPI parameter objects.
 *
 * @param parameters - An object containing `query`, `path`, and `header` parameters.
 * @returns An array of strings like `'query:z.object({...})'` or `'params:z.object({...})'`.
 */
export const requestParamsArray = (parameters: {
  readonly [k: string]: { readonly [k: string]: string }
}): readonly string[] =>
  Object.entries(parameters)
    .filter(([, obj]) => obj && Object.keys(obj).length)
    .map(([section, obj]) => {
      const name =
        section === 'path'
          ? 'params'
          : section === 'header'
            ? 'headers'
            : section === 'cookie'
              ? 'cookies'
              : section
      const fields = Object.entries(obj)
        .map(([k, v]) => `${k}:${v}`)
        .join(',')
      return `${name}:z.object({${fields}})`
    })

/**
 * Escapes a string for safe use in TypeScript string literals.
 *
 * @param text - The input text to escape.
 * @returns The escaped string.
 */
export function escapeStringLiteral(text: string): string {
  return text
    .replace(/[\n\t]/g, ' ')
    .replace(/\u200B|\u200C|\u200D|\uFEFF/g, ' ')
    .replace(/　/g, ' ')
    .replace(/\s+/g, ' ')
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")
    .trim()
}

/**
 * Converts a string to a safe TypeScript object key.
 *
 * @param text - The string to convert to a safe identifier.
 * @returns A safe identifier string.
 *
 * @example
 * ```ts
 * getToSafeIdentifier('user')        // → 'user'
 * getToSafeIdentifier('_id')         // → '_id'
 * getToSafeIdentifier('123key')      // → '"123key"'
 * getToSafeIdentifier('hello world') // → '"hello world"'
 * getToSafeIdentifier('if')          // → 'if'
 * ```
 */
export function getToSafeIdentifier(text: string): string {
  return /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(text) ? text : JSON.stringify(text)
}

export function toIdentifierPascalCase(text: string): string {
  // Check if text contains non-ASCII characters (char code > 127)
  const hasNonAscii = Array.from(text).some((c) => c.charCodeAt(0) > 127)
  const result = text
    .replace(/[^A-Za-z0-9_$]/g, '_') // invalid character to _
    .replace(/_+/g, '_') // collapse consecutive underscores to one
    .replace(/^_+|_+$/g, '') // trim leading/trailing underscores
    .replace(/^([0-9])/, '_$1') // if starts with number, add _
    .replace(/_+([a-zA-Z])/g, (_, c) => c.toUpperCase()) // _letter to uppercase (e.g. _letter -> Letter)
    .replace(/^([a-z])/, (_, c) => c.toUpperCase()) // first letter to uppercase (e.g. letter -> Letter)
  // Fallback if result is empty or only underscores (e.g. all non-ASCII input like Japanese)
  if (!result || /^_+$/.test(result)) {
    const hash = Array.from(text).reduce((acc, c) => acc + c.charCodeAt(0), 0)
    return `Unnamed${hash}`
  }
  // If text contained non-ASCII, append hash for uniqueness
  if (hasNonAscii) {
    const hash = Array.from(text).reduce((acc, c) => acc + c.charCodeAt(0), 0)
    return `${result}${hash}`
  }
  return result
}

/**
 * Builds a named import line for a module specifier.
 *
 * @param names - Import names to include.
 * @param spec - Module specifier.
 * @param options - Optional sorting behavior.
 * @returns Import line or empty string when no names exist.
 */
export function renderNamedImport(names: readonly string[], spec: string): string {
  const unique = Array.from(new Set(names))
  return unique.length > 0 ? `import{${unique.join(',')}}from'${spec}'` : ''
}

/**
 * Finds all schema tokens in the given code.
 * @param code - The code to search for schema tokens.
 * @returns
 */
export function findSchema(code: string): readonly string[] {
  return Array.from(
    new Set(
      Array.from(code.matchAll(/\b([A-Za-z_$][A-Za-z0-9_$]*Schema)\b/g))
        .map((m) => m[1] ?? '')
        .filter(Boolean),
    ),
  )
}

/**
 * Converts the first character of a string to lowercase.
 * @param text - The string to convert to lowercase.
 * @returns
 */
export function lowerFirst(text: string): string {
  return text ? (text[0]?.toLowerCase() ?? '') + text.slice(1) : text
}

export function ensureSuffix(text: string, suffix: string): string {
  return text.endsWith(suffix) ? text : `${text}${suffix}`
}

/**
 * Generates a Zod schema constant and optional inferred type alias.
 *
 * @param schemaName - The base name of the schema (used for variable and type names)
 * @param zodSchema - The Zod schema string to assign
 * @param exportSchema - Whether to `export` the Zod schema constant
 * @param exportType - Whether to `export` the inferred type alias
 * @returns The generated code string containing the schema and optional type alias
 *
 * @example
 * zodToOpenAPISchema('User', 'z.object({name: z.string()})', true, true)
 * // → 'export const UserSchema = z.object({name: z.string()}).openapi("User")\n\nexport type User = z.infer<typeof UserSchema>'
 */
export function zodToOpenAPISchema(
  schemaName: string,
  zodSchema: string,
  exportSchema: boolean,
  exportType: boolean,
  notComponentSchema?: boolean,
): string {
  const schemaCode = exportSchema
    ? `export const ${schemaName}=${zodSchema}`
    : `const ${schemaName}=${zodSchema}`

  // schema code
  const componentSchemaCode = exportSchema
    ? `export const ${schemaName}=${zodSchema}.openapi('${schemaName.replace('Schema', '')}')`
    : `const ${schemaName}=${zodSchema}.openapi('${schemaName.replace('Schema', '')}')`
  // zod infer code
  const zodInferCode = exportType
    ? `\n\nexport type ${schemaName.replace('Schema', '')}=z.infer<typeof ${schemaName}>`
    : ''

  if (notComponentSchema) return `${schemaCode}${zodInferCode}`
  return `${componentSchemaCode}${zodInferCode}`
}

// Test run
// pnpm vitest run ./packages/hono-takibi/src/utils/index.ts
if (import.meta.vitest) {
  const { describe, it, expect } = import.meta.vitest
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
            template: false,
            test: false,
            basePath: '/',
            componentsOptions: {
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
            },
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
            template: true,
            test: true,
            basePath: '/api/v1',
            componentsOptions: {
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
            },
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
}
