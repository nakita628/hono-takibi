/**
 * Parse the config object.
 *
 * @param config - The config object to parse.
 */
export function parseConfig(config: {
  readonly input: `${string}.yaml` | `${string}.json` | `${string}.tsp`
  readonly 'zod-openapi'?: {
    readonly output?: `${string}.ts`
    readonly exportSchemas?: boolean
    readonly exportSchemasTypes?: boolean
    readonly exportParameters?: boolean
    readonly exportParametersTypes?: boolean
    readonly exportSecuritySchemes?: boolean
    readonly exportRequestBodies?: boolean
    readonly exportResponses?: boolean
    readonly exportHeaders?: boolean
    readonly exportHeadersTypes?: boolean
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
          readonly exportSchemas?: boolean
          readonly exportSchemasTypes?: boolean
          readonly exportParameters?: boolean
          readonly exportParametersTypes?: boolean
          readonly exportSecuritySchemes?: boolean
          readonly exportRequestBodies?: boolean
          readonly exportResponses?: boolean
          readonly exportHeaders?: boolean
          readonly exportHeadersTypes?: boolean
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
      if (exportTypesValue !== undefined && typeof exportTypesValue !== 'boolean') {
        return {
          ok: false,
          error: `Invalid exportTypes format for components.${k}: ${String(exportTypesValue)}`,
        }
      }
    }

    const splitValue = v.split
    if (splitValue !== undefined && typeof splitValue !== 'boolean') {
      return {
        ok: false,
        error: `Invalid split format for components.${k}: ${String(splitValue)}`,
      }
    }
    const isSplit = splitValue ?? false
    if (isSplit) {
      if (isTs(v.output)) {
        return {
          ok: false,
          error: `Invalid ${k} output path for split mode (must be a directory, not .ts): ${v.output}`,
        }
      }
    } else {
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
    if (zo.exportSchemasTypes !== undefined && typeof zo.exportSchemasTypes !== 'boolean') {
      return {
        ok: false,
        error: `Invalid exportSchemasTypes format for zod-openapi: ${String(zo.exportSchemasTypes)}`,
      }
    }

    if (zo.exportSchemas !== undefined && typeof zo.exportSchemas !== 'boolean') {
      return {
        ok: false,
        error: `Invalid exportSchemas format for zod-openapi: ${String(zo.exportSchemas)}`,
      }
    }
    const exportSchemas = zo.exportSchemas ?? false

    if (zo.exportParametersTypes !== undefined && typeof zo.exportParametersTypes !== 'boolean') {
      return {
        ok: false,
        error: `Invalid exportParametersTypes format for zod-openapi: ${String(zo.exportParametersTypes)}`,
      }
    }

    if (zo.exportParameters !== undefined && typeof zo.exportParameters !== 'boolean') {
      return {
        ok: false,
        error: `Invalid exportParameters format for zod-openapi: ${String(zo.exportParameters)}`,
      }
    }
    const exportParameters = zo.exportParameters ?? false

    if (zo.exportSecuritySchemes !== undefined && typeof zo.exportSecuritySchemes !== 'boolean') {
      return {
        ok: false,
        error: `Invalid exportSecuritySchemes format for zod-openapi: ${String(
          zo.exportSecuritySchemes,
        )}`,
      }
    }

    if (zo.exportRequestBodies !== undefined && typeof zo.exportRequestBodies !== 'boolean') {
      return {
        ok: false,
        error: `Invalid exportRequestBodies format for zod-openapi: ${String(
          zo.exportRequestBodies,
        )}`,
      }
    }
    if (zo.exportResponses !== undefined && typeof zo.exportResponses !== 'boolean') {
      return {
        ok: false,
        error: `Invalid exportResponses format for zod-openapi: ${String(zo.exportResponses)}`,
      }
    }
    const exportResponses = zo.exportResponses ?? false

    if (zo.exportHeadersTypes !== undefined && typeof zo.exportHeadersTypes !== 'boolean') {
      return {
        ok: false,
        error: `Invalid exportHeadersTypes format for zod-openapi: ${String(zo.exportHeadersTypes)}`,
      }
    }

    if (zo.exportHeaders !== undefined && typeof zo.exportHeaders !== 'boolean') {
      return {
        ok: false,
        error: `Invalid exportHeaders format for zod-openapi: ${String(zo.exportHeaders)}`,
      }
    }

    if (zo.exportExamples !== undefined && typeof zo.exportExamples !== 'boolean') {
      return {
        ok: false,
        error: `Invalid exportExamples format for zod-openapi: ${String(zo.exportExamples)}`,
      }
    }

    if (zo.exportLinks !== undefined && typeof zo.exportLinks !== 'boolean') {
      return {
        ok: false,
        error: `Invalid exportLinks format for zod-openapi: ${String(zo.exportLinks)}`,
      }
    }
    if (zo.exportCallbacks !== undefined && typeof zo.exportCallbacks !== 'boolean') {
      return {
        ok: false,
        error: `Invalid exportCallbacks format for zod-openapi: ${String(zo.exportCallbacks)}`,
      }
    }
  }

  const routes = zo?.routes
  if (routes !== undefined) {
    const splitValue = routes.split
    if (splitValue !== undefined && typeof splitValue !== 'boolean') {
      return {
        ok: false,
        error: `Invalid split format for routes: ${String(splitValue)}`,
      }
    }
    const isSplit = splitValue ?? false
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
    const splitValue = rpc.split
    if (splitValue !== undefined && typeof splitValue !== 'boolean') {
      return { ok: false, error: `Invalid split format for rpc: ${String(splitValue)}` }
    }
    // split
    const isSplit = splitValue ?? false
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
