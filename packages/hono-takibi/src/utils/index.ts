/**
 * Parse the config object.
 *
 * @param config - The config object to parse.
 */
const invalidBoolean = (value: unknown, name: string, scope: string): string | undefined =>
  value !== undefined && typeof value !== 'boolean'
    ? `Invalid ${name} format for ${scope}: ${String(value)}`
    : undefined

export function parseConfig(config: {
  readonly input: `${string}.yaml` | `${string}.json` | `${string}.tsp`
  readonly 'zod-openapi'?: {
    readonly output?: `${string}.ts`
    readonly exportSchemasTypes?: boolean
    readonly exportSchemas?: boolean
    readonly exportParametersTypes?: boolean
    readonly exportParameters?: boolean
    readonly exportSecuritySchemes?: boolean
    readonly exportRequestBodies?: boolean
    readonly exportResponses?: boolean
    readonly exportHeadersTypes?: boolean
    readonly exportHeaders?: boolean
    readonly exportExamples?: boolean
    readonly exportLinks?: boolean
    readonly exportCallbacks?: boolean
    readonly routes?: {
      readonly output: string | `${string}.ts`
      readonly split?: boolean
    }
    readonly components?: {
      readonly [K in
        | 'schemas'
        | 'parameters'
        | 'securitySchemes'
        | 'requestBodies'
        | 'responses'
        | 'headers'
        | 'examples'
        | 'links'
        | 'callbacks']?: K extends 'schemas' | 'parameters' | 'headers'
        ? {
            readonly output: string | `${string}.ts`
            readonly exportTypes?: boolean
            readonly split?: boolean
            readonly import?: string
          }
        : {
            readonly output: string | `${string}.ts`
            readonly split?: boolean
            readonly import?: string
          }
    }
  }
  readonly type?: {
    readonly output: `${string}.ts`
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
          readonly exportSchemasTypes?: boolean
          readonly exportSchemas?: boolean
          readonly exportParametersTypes?: boolean
          readonly exportParameters?: boolean
          readonly exportSecuritySchemes?: boolean
          readonly exportRequestBodies?: boolean
          readonly exportResponses?: boolean
          readonly exportHeadersTypes?: boolean
          readonly exportHeaders?: boolean
          readonly exportExamples?: boolean
          readonly exportLinks?: boolean
          readonly exportCallbacks?: boolean
          readonly routes?: {
            readonly output: string | `${string}.ts`
            readonly split?: boolean
          }
          readonly components?: {
            readonly [K in
              | 'schemas'
              | 'parameters'
              | 'securitySchemes'
              | 'requestBodies'
              | 'responses'
              | 'headers'
              | 'examples'
              | 'links'
              | 'callbacks']?: K extends 'schemas' | 'parameters' | 'headers'
              ? {
                  readonly output: string | `${string}.ts`
                  readonly exportTypes?: boolean
                  readonly split?: boolean
                  readonly import?: string
                }
              : {
                  readonly output: string | `${string}.ts`
                  readonly split?: boolean
                  readonly import?: string
                }
          }
        }
        readonly type?: {
          readonly output: `${string}.ts`
        }
        readonly rpc?: {
          readonly output: string | `${string}.ts`
          readonly import: string
          readonly split?: boolean
        }
      }
    }
  | {
      readonly ok: false
      readonly error: string
    } {
  const isYamlOrJsonOrTsp = (
    i: unknown,
  ): i is `${string}.yaml` | `${string}.json` | `${string}.tsp` =>
    typeof i === 'string' && (i.endsWith('.yaml') || i.endsWith('.json') || i.endsWith('.tsp'))
  // ts
  const isTs = (o: unknown): o is `${string}.ts` => typeof o === 'string' && o.endsWith('.ts')

  const parseComponentsValue = <
    K extends
      | 'schemas'
      | 'parameters'
      | 'securitySchemes'
      | 'requestBodies'
      | 'responses'
      | 'headers'
      | 'examples'
      | 'links'
      | 'callbacks',
  >(
    k: K,
    v?: K extends 'schemas' | 'parameters' | 'headers'
      ? {
          readonly output: string | `${string}.ts`
          readonly exportTypes?: boolean
          readonly split?: boolean
          readonly import?: string
        }
      : {
          readonly output: string | `${string}.ts`
          readonly split?: boolean
          readonly import?: string
        },
  ):
    | { readonly ok: true; readonly value: undefined }
    | { readonly ok: false; readonly error: string } => {
    if (v === undefined)
      return { ok: false, error: `Invalid config: zod-openapi.components.${k} is undefined` }

    if (k === 'schemas' || k === 'parameters' || k === 'headers') {
      const exportTypesValue = 'exportTypes' in v ? v.exportTypes : undefined
      const exportTypesError = invalidBoolean(exportTypesValue, 'exportTypes', `components.${k}`)
      if (exportTypesError) return { ok: false, error: exportTypesError }
    }

    const isSplit = v.split === true
    if (isSplit) {
      if (isTs(v.output)) {
        return {
          ok: false,
          error: `Invalid ${k} output path for split mode (must be a directory, not .ts): ${v.output}`,
        }
      }
    } else {
      const splitError = invalidBoolean(v.split, 'split', `components.${k}`)
      if (splitError) return { ok: false, error: splitError }
      if (!isTs(v.output)) {
        return {
          ok: false,
          error: `Invalid ${k} output path for non-split mode (must be .ts file): ${v.output}`,
        }
      }
    }

    if (v.import !== undefined && typeof v.import !== 'string') {
      return {
        ok: false,
        error: `Invalid import format for components.${k}: ${String(v.import)}`,
      }
    }

    return { ok: true, value: undefined }
  }

  const c = config

  if (!isYamlOrJsonOrTsp(c.input)) {
    return { ok: false, error: `Invalid input: ${String(c.input)} (must be .yaml | .json | .tsp)` }
  }

  // zod-openapi
  const zo = c['zod-openapi']

  if (zo !== undefined) {
    const flagChecks: Array<[string, unknown]> = [
      ['exportSchemasTypes', zo.exportSchemasTypes],
      ['exportSchemas', zo.exportSchemas],
      ['exportParametersTypes', zo.exportParametersTypes],
      ['exportParameters', zo.exportParameters],
      ['exportSecuritySchemes', zo.exportSecuritySchemes],
      ['exportRequestBodies', zo.exportRequestBodies],
      ['exportResponses', zo.exportResponses],
      ['exportHeadersTypes', zo.exportHeadersTypes],
      ['exportHeaders', zo.exportHeaders],
      ['exportExamples', zo.exportExamples],
      ['exportLinks', zo.exportLinks],
      ['exportCallbacks', zo.exportCallbacks],
    ]
    const flagError = flagChecks
      .map(([name, value]) => invalidBoolean(value, name, 'zod-openapi'))
      .find((error): error is string => error !== undefined)
    if (flagError) return { ok: false, error: flagError }
  }

  const routes = zo?.routes
  if (routes !== undefined) {
    const isSplit = routes.split === true
    if (isSplit) {
      if (isTs(routes.output)) {
        return {
          ok: false,
          error: `Invalid routes output path for split mode (must be a directory, not .ts): ${routes.output}`,
        }
      }
    } else {
      if (!isTs(routes.output)) {
        return {
          ok: false,
          error: `Invalid routes output path for non-split mode (must be .ts file): ${routes.output}`,
        }
      }
      const splitError = invalidBoolean(routes.split, 'split', 'routes')
      if (splitError) return { ok: false, error: splitError }
    }
  }

  const components = zo?.components
  if (components !== undefined) {
    for (const k in components) {
      if (
        k === 'schemas' ||
        k === 'parameters' ||
        k === 'securitySchemes' ||
        k === 'requestBodies' ||
        k === 'responses' ||
        k === 'headers' ||
        k === 'examples' ||
        k === 'links' ||
        k === 'callbacks'
      ) {
        const result = parseComponentsValue(k, components[k])
        if (!result.ok) return { ok: false, error: result.error }
      }
    }
  }

  // type
  const t = c.type
  if (t !== undefined) {
    if (!isTs(t.output)) {
      return {
        ok: false,
        error: `Invalid type output format: ${String(t.output)} (must be .ts file)`,
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
    const splitError = invalidBoolean(rpc.split, 'split', 'rpc')
    if (splitError) return { ok: false, error: splitError }
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
        readonly exportSchemasTypes: boolean
        readonly exportSchemas: boolean
        readonly exportParametersTypes: boolean
        readonly exportParameters: boolean
        readonly exportSecuritySchemes: boolean
        readonly exportRequestBodies: boolean
        readonly exportResponses: boolean
        readonly exportHeadersTypes: boolean
        readonly exportHeaders: boolean
        readonly exportExamples: boolean
        readonly exportLinks: boolean
        readonly exportCallbacks: boolean
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
      exportSchemasTypes: args.includes('--export-schemas-types'),
      exportSchemas: args.includes('--export-schemas'),
      exportParametersTypes: args.includes('--export-parameters-types'),
      exportParameters: args.includes('--export-parameters'),
      exportSecuritySchemes: args.includes('--export-security-schemes'),
      exportRequestBodies: args.includes('--export-request-bodies'),
      exportResponses: args.includes('--export-responses'),
      exportHeadersTypes: args.includes('--export-headers-types'),
      exportHeaders: args.includes('--export-headers'),
      exportExamples: args.includes('--export-examples'),
      exportLinks: args.includes('--export-links'),
      exportCallbacks: args.includes('--export-callbacks'),
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
export function refSchema(
  $ref:
    | `#/components/schemas/${string}`
    | `#/components/parameters/${string}`
    | `#/components/headers/${string}`,
): string {
  // split('/'): Split a string into an array using slashes
  // 1. ["#", "components", "schemas", "Address"]
  // pop() to get the last element
  // 2. "Address"
  const ref = $ref.split('/').pop()
  if (!ref) return 'Schema'
  if ($ref.startsWith('#/components/parameters/')) {
    if (ref.endsWith('ParamsSchema')) return ref
    if (ref.endsWith('Params')) return `${ref}Schema`
    return `${ref}ParamsSchema`
  }
  if ($ref.startsWith('#/components/headers/')) {
    if (ref.endsWith('HeaderSchema')) return ref
    if (ref.endsWith('Header')) return `${ref}Schema`
    return `${ref}HeaderSchema`
  }
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
 *
 * @param text - The string to convert to a safe identifier.
 * @returns
 */
export function toIdentifier(text: string): string {
  const sanitized = text.replace(/[^A-Za-z0-9_$]/g, '_')
  return /^[A-Za-z_$]/.test(sanitized) ? sanitized : `_${sanitized}`
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

/**
 * Builds a named import line for a module specifier.
 *
 * @param names - Import names to include.
 * @param spec - Module specifier.
 * @param options - Optional sorting behavior.
 * @returns Import line or empty string when no names exist.
 */
export function renderNamedImport(
  names: readonly string[],
  spec: string,
  options?: { readonly sort?: boolean },
): string {
  const unique = Array.from(new Set(names))
  const list = options?.sort ? [...unique].sort() : unique
  return list.length > 0 ? `import { ${list.join(',')} } from '${spec}'` : ''
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
 * Creates an import target from a component config object.
 *
 * @param config - The component configuration object.
 * @param transform - Optional function to transform the output path (e.g., toAbs for absolute paths).
 * @returns An import target object or undefined if config is undefined.
 */
export function configToTarget(
  config?: {
    readonly output: string | `${string}.ts`
    readonly split?: boolean
    readonly import?: string
  },
  transform?: (output: string) => string,
):
  | {
      readonly output: string | `${string}.ts`
      readonly split?: boolean
      readonly import?: string
    }
  | undefined {
  if (!config) return undefined
  const output = transform ? transform(config.output) : config.output
  return {
    output,
    ...(config.split !== undefined ? { split: config.split } : {}),
    ...(config.import !== undefined ? { import: config.import } : {}),
  }
}
