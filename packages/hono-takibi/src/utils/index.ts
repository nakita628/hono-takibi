export function parseConfig(config: {
  readonly input: `${string}.yaml` | `${string}.json` | `${string}.tsp`
  readonly 'zod-openapi'?: {
    readonly output?: `${string}.ts`
    readonly exportType?: boolean
    readonly exportSchema?: boolean
    readonly schema?: {
      readonly output: string | `${string}.ts`
      readonly exportType?: boolean
      readonly split?: boolean
    }
    readonly route?: {
      readonly output: string | `${string}.ts`
      readonly import: string
      readonly split?: boolean
    }
  }
  readonly rpc?: {
    readonly output: string | `${string}.ts`
    readonly import: string
    readonly split?: boolean
  }
}):
  | {
      readonly ok: true
      readonly value: {
        readonly input: `${string}.yaml` | `${string}.json` | `${string}.tsp`
        readonly 'zod-openapi'?: {
          readonly output?: `${string}.ts`
          readonly exportType?: boolean
          readonly exportSchema?: boolean
          readonly schema?: {
            readonly output: string | `${string}.ts`
            readonly exportType?: boolean
            readonly split?: boolean
          }
          readonly route?: {
            readonly output: string | `${string}.ts`
            readonly import: string
            readonly split?: boolean
          }
        }
        readonly rpc?: {
          readonly output: string | `${string}.ts`
          readonly import: string
          readonly split?: boolean
        }
      }
    }
  | { readonly ok: false; readonly error: string } {
  const isYamlOrJsonOrTsp = (
    i: unknown,
  ): i is `${string}.yaml` | `${string}.json` | `${string}.tsp` =>
    typeof i === 'string' && (i.endsWith('.yaml') || i.endsWith('.json') || i.endsWith('.tsp'))
  const isTs = (o: unknown): o is `${string}.ts` => typeof o === 'string' && o.endsWith('.ts')

  const c = config

  if (!isYamlOrJsonOrTsp(c.input)) {
    return { ok: false, error: `Invalid input: ${String(c.input)} (must be .yaml | .json | .tsp)` }
  }

  // zod-openapi
  const zo = c['zod-openapi']
  if (zo !== undefined) {
    // boolean flags
    if (zo.exportSchema !== undefined && typeof zo.exportSchema !== 'boolean') {
      return {
        ok: false,
        error: `Invalid exportSchema format for zod-openapi: ${String(zo.exportSchema)}`,
      }
    }
    if (zo.exportType !== undefined && typeof zo.exportType !== 'boolean') {
      return {
        ok: false,
        error: `Invalid exportType format for zod-openapi: ${String(zo.exportType)}`,
      }
    }

    const hs = zo.schema !== undefined
    const hr = zo.route !== undefined

    if (hs !== hr) {
      return {
        ok: false,
        error:
          "Invalid config: 'zod-openapi.schema' and 'zod-openapi.route' must be defined together (both or neither).",
      }
    }

    if (hs || hr) {
      if (Object.hasOwn(zo, 'output')) {
        return {
          ok: false,
          error:
            "Invalid config: When using 'zod-openapi.schema' or 'zod-openapi.route', do NOT set 'zod-openapi.output'.",
        }
      }
    } else {
      if (!isTs(zo.output)) {
        return {
          ok: false,
          error: `Invalid output format for zod-openapi: ${String(zo.output)}`,
        }
      }
    }

    if (hs) {
      const s = zo.schema
      if (!s) return { ok: false, error: 'Invalid config: zod-openapi.schema is undefined' }

      if (s.split !== undefined && typeof s.split !== 'boolean') {
        return {
          ok: false,
          error: `Invalid schema split format for zod-openapi: ${String(s.split)}`,
        }
      }
      if (typeof s.output !== 'string') {
        return { ok: false, error: `Invalid schema output path: ${String(s.output)}` }
      }

      if (s.split === true) {
        if (isTs(s.output)) {
          return {
            ok: false,
            error: `Invalid schema output path for split mode (must be a directory, not .ts): ${s.output}`,
          }
        }
      } else {
        if (!isTs(s.output)) {
          return {
            ok: false,
            error: `Invalid schema output path for non-split mode (must be .ts file): ${s.output}`,
          }
        }
      }

      if (s.exportType !== undefined && typeof s.exportType !== 'boolean') {
        return {
          ok: false,
          error: `Invalid schema exportType format for zod-openapi: ${String(s.exportType)}`,
        }
      }
    }

    if (hr) {
      const r = zo.route
      if (!r) return { ok: false, error: 'Invalid config: zod-openapi.route is undefined' }
      if (typeof r.import !== 'string') {
        return {
          ok: false,
          error: `Invalid route import format for zod-openapi: ${String(r.import)}`,
        }
      }
      if (r.split !== undefined && typeof r.split !== 'boolean') {
        return {
          ok: false,
          error: `Invalid route split format for zod-openapi: ${String(r.split)}`,
        }
      }
      if (typeof r.output !== 'string') {
        return { ok: false, error: `Invalid route output path: ${String(r.output)}` }
      }

      if (r.split === true) {
        if (isTs(r.output)) {
          return {
            ok: false,
            error: `Invalid route output path for split mode (must be a directory, not .ts): ${r.output}`,
          }
        }
      } else {
        if (!isTs(r.output)) {
          return {
            ok: false,
            error: `Invalid route output path for non-split mode (must be .ts file): ${r.output}`,
          }
        }
      }
    }
  }
  // rpc
  const rpc = c.rpc
  if (rpc !== undefined) {
    if (typeof rpc.output !== 'string') {
      return { ok: false, error: `Invalid output format for rpc: ${String(rpc.output)}` }
    }
    if (typeof rpc.import !== 'string') {
      return { ok: false, error: `Invalid import format for rpc: ${String(rpc.import)}` }
    }
    if (rpc.split !== undefined && typeof rpc.split !== 'boolean') {
      return { ok: false, error: `Invalid split format for rpc: ${String(rpc.split)}` }
    }
    // split
    const isSplit = rpc.split === true
    if (isSplit) {
      if (isTs(rpc.output)) {
        return {
          ok: false,
          error: `Invalid rpc output path for split mode (must be a directory, not .ts): ${rpc.output}`,
        }
      }
    } else {
      if (!isTs(rpc.output)) {
        return {
          ok: false,
          error: `Invalid output format for rpc (non-split mode must be .ts file): ${String(rpc.output)}`,
        }
      }
    }
  }
  return { ok: true, value: c }
}

/**
 * Parse raw CLI arguments into structured options.
 *
 * - Validates `<input>` ends with `.yaml`/`.json`/`.tsp`
 * - Requires `-o <output.ts>`
 * - Extracts boolean flags (`--export-type`, `--export-schema`, `--template`, `--test`)
 * - Extracts optional `--base-path <path>`
 *
 * ```mermaid
 * flowchart TD
 *   A["parseCli(args)"] --> B["Extract input & output (-o)"]
 *   B --> C{"input endsWith .yaml/.json/.tsp AND output endsWith .ts?"}
 *   C -->|No| D["return { ok:false, error:'Usage: hono-takibi ...' }"]
 *   C -->|Yes| E["Read flags (--export-type, --export-schema, --template, --test)"]
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
        readonly exportType: boolean
        readonly exportSchema: boolean
        readonly template: boolean
        readonly test: boolean
        readonly basePath?: string
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
      exportType: args.includes('--export-type'),
      exportSchema: args.includes('--export-schema'),
      template: args.includes('--template'),
      test: args.includes('--test'),
      basePath: getFlagValue(args, '--base-path'),
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
export function registerComponent(securitySchemes: {
  readonly [key: string]: {
    readonly type?: string
    readonly name?: string
    readonly scheme?: string
    readonly bearerFormat?: string
  }
}): string {
  return Object.entries(securitySchemes)
    .map(([name, scheme]) => {
      return `app.openAPIRegistry.registerComponent('securitySchemes','${name}',${JSON.stringify(scheme)})`
    })
    .join('\n')
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
        readonly $ref?: `#/components/schemas/${string}`
      }
    }
  },
): boolean {
  const schema = new Set(contentTypes.map((type) => JSON.stringify(content?.[type].schema)))
  return schema.size === 1
}

/**
 * Extracts the type name from an OpenAPI `$ref` string.
 *
 * @param $ref - A reference path like `#/components/schemas/Address`.
 * @returns The extracted type name with `Schema` suffix.
 *
 * @example
 * ```ts
 * refSchema('#/components/schemas/Address')
 * // → 'AddressSchema'
 * ```
 */
export function refSchema($ref: `#/components/schemas/${string}`): string {
  // split('/'): Split a string into an array using slashes
  // 1. ["#", "components", "schemas", "Address"]
  // pop() to get the last element
  // 2. "Address"
  const ref = $ref.split('/').pop()
  return `${ref}Schema`
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
 * Generates a Hono route definition as a TypeScript export string.
 *
 * @param args - Route metadata and OpenAPI friendly fragments (`method`, `path`, `requestParams`, `responses`, etc.).
 * @returns A string representing an `export const <name> = createRoute({ ... })` statement.
 *
 * @example
 * createRoute({
 *   routeName: 'getUserRoute',
 *   method: 'method:"get",',
 *   path: 'path:"/user",',
 *   requestParams: 'request:{query:z.object({ id: z.string() })},',
 *   responses: 'responses:{200:{description:"OK"}}'
 * })
 * // => export const getUserRoute = createRoute({method:"get",path:"/user",request:{query:...},responses:{...}})
 */
export function createRoute(args: {
  readonly routeName: string
  readonly tags?: string
  readonly method: string
  readonly path: string
  readonly operationId?: string
  readonly summary?: string
  readonly description?: string
  readonly security?: string
  readonly requestParams: string
  readonly responses: string
}): string {
  const properties = [
    args.tags,
    args.method,
    args.path,
    args.operationId,
    args.summary,
    args.description,
    args.security,
    args.requestParams,
    args.responses,
  ].join('')
  return `export const ${args.routeName}=createRoute({${properties}})`
}

/**
 * Generates an array of Zod validator strings from OpenAPI parameter objects.
 *
 * @param parameters - An object containing `query`, `path`, and `header` parameters.
 * @returns An array of strings like `'query:z.object({...})'` or `'params:z.object({...})'`.
 */
export const requestParamsArray = (
  parameters: Record<string, Record<string, string>>,
): readonly string[] =>
  Object.entries(parameters)
    .filter(([, obj]) => obj && Object.keys(obj).length)
    .map(([section, obj]) => {
      const name = section === 'path' ? 'params' : section
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

/**
 * Replaces any character not matching `[A-Za-z0-9_$]` with `_`.
 *
 * @param text - The raw string to sanitize.
 * @returns A valid identifier string.
 *
 * @example
 * ```ts
 * sanitizeIdentifier('foo-bar')        // → 'foo_bar'
 * sanitizeIdentifier('123user@name')   // → '123user_name'
 * sanitizeIdentifier('日本語')           // → '___'
 * sanitizeIdentifier('post.title')     // → 'post_title'
 * sanitizeIdentifier('valid_Name')     // → 'valid_Name'
 * ```
 */
export function sanitizeIdentifier(text: string): string {
  return text.replace(/[^A-Za-z0-9_$]/g, '_')
}

/**
 * Appends a properly escaped `.regex(/pattern/)` clause.
 *
 * @param pattern - A raw regex pattern **without** the surrounding slashes.
 * @returns A string like `'.regex(/^[a-z]+$/)'`.
 */
export function regex(pattern: string): string {
  return `.regex(/${pattern.replace(/(?<!\\)\//g, '\\/')}/)`
}
