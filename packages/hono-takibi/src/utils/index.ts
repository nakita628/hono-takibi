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
      ok: true
      value: {
        input: `${string}.yaml` | `${string}.json` | `${string}.tsp`
        output: `${string}.ts`
        exportType: boolean
        exportSchema: boolean
        template: boolean
        test: boolean
        basePath?: string
      }
    }
  | {
      ok: false
      error: string
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
 * - `undefined` → `[]`
 * - `'string'`  → `['string']`
 * - `['string','number']` → unchanged
 *
 * ```mermaid
 * graph TD
 *   A1[normalizeTypes] --> B1{is undefined}
 *   B1 -->|Yes| C1[return empty array]
 *   B1 -->|No| D1{is array}
 *   D1 -->|Yes| E1[return t]
 *   D1 -->|No| F1[return array with t]
 * ```
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
 * Generates import statements for route handler modules.
 *
 * ```mermaid
 * graph TD
 *   A[Start importRoutes] --> B[Init result list]
 *   B --> C[Iterate entries]
 *   C --> D[Make unique names]
 *   D --> E[Normalize path if needed]
 *   E --> F[Build import line]
 *   F --> G[Append to result list]
 *   G --> H[More entries]
 *   H -->|Yes| C
 *   H -->|No| I[Return result list]
 * ```
 *
 * @param importsMap - Map of file paths to exported identifiers.
 * @returns Array of import statements.
 */
export function importRoutes(importsMap: { [importPath: `${string}.ts`]: string[] }) {
  const importRoutes: string[] = []
  for (const [importPath, names] of Object.entries(importsMap)) {
    const uniqueNames = Array.from(new Set(names))
    if (importPath.includes('index.ts')) {
      const normalizedPath = importPath.replace('index.ts', '')
      importRoutes.push(`import { ${uniqueNames.join(',')} } from './${normalizedPath}'`)
    } else {
      importRoutes.push(`import { ${uniqueNames.join(',')} } from './${importPath}'`)
    }
  }
  return importRoutes
}

/**
 * Generates registration code for OpenAPI `securitySchemes`.
 *
 * The code calls:
 * ```
 * app.openAPIRegistry.registerComponent('securitySchemes', name, scheme)
 * ```
 * for each entry in the provided record.
 *
 * ```mermaid
 * graph TD
 *   A[Start registerComponent] --> B[Iterate over securitySchemes]
 *   B --> C[Build registration string for each name + scheme]
 *   C --> D[Join all strings with newline]
 *   D --> E[Return final code string]
 * ```
 *
 * @param securitySchemes - Record of scheme name to scheme properties.
 * @returns Multiline string of registration statements.
 */
export function registerComponent(securitySchemes: {
  [key: string]: {
    type?: string
    name?: string
    scheme?: string
    bearerFormat?: string
  }
}): string {
  return Object.entries(securitySchemes)
    .map(([name, scheme]) => {
      return `app.openAPIRegistry.registerComponent('securitySchemes','${name}',${JSON.stringify(scheme)})`
    })
    .join('\n')
}

/**
 * Generates an import map that associates route names with their corresponding import file path.
 *
 * This is useful for dynamically constructing import statements in code generation,
 * ensuring that each route is grouped under its appropriate file.
 *
 * ```mermaid
 * graph TD
 *   A[Start importMap] --> B[Initialize empty map]
 *   B --> C[Iterate routeMappings]
 *   C --> D[Extract output file name]
 *   D --> E[Check if map has key]
 *   E --> F[Create array if missing]
 *   F --> G[Add route name to array]
 *   G --> H[More routeMappings]
 *   H --> C
 *   C --> I[Return importsMap]
 * ```
 *
 * @param routeMappings - An array of route mapping objects containing route name, handler name, and path.
 * @param output - The output TypeScript file name (e.g., 'user.ts'). Used to determine the import path.
 * @returns A record where each key is an import path (e.g., 'user.ts') and the value is an array of route names imported from that path.
 */
export function importMap(
  routeMappings: {
    routeName: string
    handlerName: string
    path: string
  }[],
  output: `${string}.ts`,
): { [importPath: `${string}.ts`]: string[] } {
  const importsMap: { [importPath: string]: string[] } = {}
  for (const { routeName } of routeMappings) {
    const match = output.match(/[^/]+\.ts$/)
    const importPath = match ? match[0] : output
    if (!importsMap[importPath]) {
      importsMap[importPath] = []
    }
    importsMap[importPath].push(routeName)
  }

  return importsMap
}

/**
 * Generates import statements for handler functions.
 *
 * ```mermaid
 * graph TD
 *   A[Start importHandlers] --> B[Init empty list]
 *   B --> C[Iterate handlerImportsMap]
 *   C --> D[Make unique handler names]
 *   D --> E[Get dir path from output]
 *   E --> F[Set handler path base]
 *   F --> G[Build import statement]
 *   G --> H[Append to list]
 *   H --> I[More entries]
 *   I --> C
 *   C --> J[Return list]
 * ```
 *
 * @param handlerImportsMap - A map from file names to handler names.
 * @param output - The output file path (e.g., 'api.ts').
 * @returns An array of import statement strings.
 */
export function importHandlers(
  handlerImportsMap: { [fileName: string]: string[] },
  output: `${string}.ts`,
): string[] {
  const importHandlers: string[] = []
  for (const [fileName, handlers] of Object.entries(handlerImportsMap)) {
    const uniqueHandlers = Array.from(new Set(handlers))
    const replacePath = output?.replace(/\/[^/]+\.ts$/, '')
    const dirPath = replacePath === undefined ? '.' : replacePath
    const handlerPath = 'handlers'
    if (dirPath === '.') {
      importHandlers.push(
        `import { ${uniqueHandlers.join(',')} } from '${handlerPath}/${fileName}'`,
      )
    } else {
      importHandlers.push(
        `import { ${uniqueHandlers.join(',')} } from './${handlerPath}/${fileName}'`,
      )
    }
  }
  return importHandlers
}

/**
 * Groups route handlers by file name.
 *
 * ```mermaid
 * graph TD
 *   A[Start groupHandlersByFileName] --> B[Create empty map]
 *   B --> C[Iterate handlers]
 *   C --> D[Find existing entry by file name]
 *   D --> E[Merge contents and route names]
 *   E --> F[Set merged entry back to map]
 *   F --> G[More handlers]
 *   G --> C
 *   C --> H[Return map values as array]
 * ```
 *
 * @param handlers - An array of route handler definitions including file name, test file name, contents, and route names.
 * @returns A deduplicated array of grouped handler definitions per file.
 */
export function groupHandlersByFileName(
  handlers: {
    fileName: `${string}.ts`
    testFileName: `${string}.ts`
    routeHandlerContents: string[]
    routeNames: string[]
  }[],
): {
  fileName: `${string}.ts`
  testFileName: `${string}.ts`
  routeHandlerContents: string[]
  routeNames: string[]
}[] {
  return Array.from(
    handlers
      .reduce((acc, handler) => {
        const existing = acc.get(handler.fileName)
        const mergedHandler = {
          fileName: handler.fileName,
          testFileName: handler.testFileName,
          routeHandlerContents: existing
            ? [...existing.routeHandlerContents, ...handler.routeHandlerContents]
            : [...handler.routeHandlerContents],
          routeNames: existing
            ? [...existing.routeNames, ...handler.routeNames]
            : [...handler.routeNames],
        }
        return acc.set(handler.fileName, mergedHandler)
      }, new Map())
      .values(),
  )
}

/**
 * Generates a map of handler file names to handler names.
 *
 * ```mermaid
 * graph TD
 *   A[Start getHandlerImports] --> B[Init empty map]
 *   B --> C[Iterate handler maps]
 *   C --> D[Take first path segment]
 *   D --> E[Sanitize segment to path name]
 *   E --> F[Make file name or index handler]
 *   F --> G[Ensure array exists in map]
 *   G --> H[Append handler name]
 *   H --> I[More items]
 *   I --> C
 *   C --> J[Return map]
 * ```
 *
 * @param handlerMaps - Array of route mappings including route name, handler name, and path.
 * @returns A map where keys are handler file names and values are arrays of handler names.
 */
export function getHandlerImports(
  handlerMaps: {
    routeName: string
    handlerName: string
    path: string
  }[],
): { [fileName: `${string}.ts`]: string[] } {
  const getHandlerImports: { [fileName: string]: string[] } = {}
  for (const { handlerName, path } of handlerMaps) {
    const rawSegment = path.replace(/^\/+/, '').split('/')[0] ?? ''
    const pathName = (rawSegment === '' ? 'index' : rawSegment)
      .replace(/\{([^}]+)\}/g, '$1')
      .replace(/[^0-9A-Za-z._-]/g, '_')
      .replace(/^[._-]+|[._-]+$/g, '')
      .replace(/__+/g, '_')
      .replace(/[-._](\w)/g, (_, c: string) => c.toUpperCase())
    const fileName = pathName.length === 0 ? 'indexHandler.ts' : `${pathName}Handler.ts`
    if (!getHandlerImports[fileName]) {
      getHandlerImports[fileName] = []
    }
    getHandlerImports[fileName].push(handlerName)
  }
  return getHandlerImports
}

/**
 * Checks if a value is a non-null object (e.g., a potential `$ref` object).
 *
 * ```mermaid
 * graph TD
 *   A[Start isRefObject] --> B[Check typeof value is object]
 *   B --> C[Check value is not null]
 *   C --> D[Return true or false]
 * ```
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
  $ref?: string
  [key: string]: unknown
} {
  return typeof value === 'object' && value !== null
}

/**
 * Checks if all given content types share the same schema definition.
 *
 * ```mermaid
 * graph TD
 *   A[Start isUniqueContentSchema] --> B[Create empty set]
 *   B --> C[Loop over content types]
 *   C --> D[Read schema for type]
 *   D --> E[Stringify and add to set]
 *   E --> F[After loop check size]
 *   F --> G[Return true if size is one]
 * ```
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
  contentTypes: string[],
  content: {
    [key: string]: {
      schema: {
        $ref?: `#/components/schemas/${string}`
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
 * ```mermaid
 * graph TD
 *   A[Start refSchema] --> B[Split $ref by slash]
 *   B --> C[Take last segment]
 *   C --> D[Append Schema suffix]
 *   D --> E[Return result string]
 * ```
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
 * ```mermaid
 * graph TD
 *   A[Start routeName] --> B[Replace special chars with space]
 *   B --> C[Trim and split by spaces]
 *   C --> D[Capitalize each segment]
 *   D --> E[Join segments into single string]
 *   E --> F[Prefix with method and suffix with Route]
 *   F --> G[Return final route name]
 * ```
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
  return apiPath ? `${method}${apiPath}` : `${method}Index`
}

/**
 * Generates a Hono route definition as a TypeScript export string.
 *
 * ```mermaid
 * graph TD
 *   A[Start createRoute] --> B[Collect properties from args]
 *   B --> C[Join properties into one string]
 *   C --> D[Build export createRoute template]
 *   D --> E[Return final code string]
 * ```
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
  routeName: string
  tags?: string
  method: string
  path: string
  operationId?: string
  summary?: string
  description?: string
  security?: string
  requestParams: string
  responses: string
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
 * ```mermaid
 * graph TD
 *   A[Start requestParamsArray] --> B[Collect non empty sections]
 *   B --> C[Iterate sections]
 *   C --> D[Build z object string from entries]
 *   D --> E[If section is path rename to params]
 *   E --> F[Push section colon z object string]
 *   F --> G[Continue loop]
 *   G --> H[Filter out null values]
 *   H --> I[Return array of strings]
 * ```
 *
 * @param parameters - An object containing `query`, `path`, and `header` parameters.
 * @returns An array of strings like `'query:z.object({...})'` or `'params:z.object({...})'`.
 */
export function requestParamsArray(parameters: {
  [section: string]: Record<string, string>
}): string[] {
  // 1.  define sections to be processed
  const sections = Object.entries(parameters)
    .filter(([_, obj]) => obj && Object.keys(obj).length > 0)
    .map(([section]) => section)
  // 2. processing of each section
  return (
    sections
      .map((section) => {
        const obj = parameters[section]
        // 2.1 process only if object is not empty
        if (Object.keys(obj).length) {
          const s = `z.object({${Object.entries(obj)
            .map(([k, v]) => `${k}:${v}`)
            .join(',')}})`
          // path is params convention
          if (section === 'path') {
            return `params:${s}`
          }
          return `${section}:${s}`
        }
        return null
      })
      // 3. exclude null and return only an array of strings
      .filter((item): item is string => item !== null)
  )
}

/**
 * Escapes a string for safe use in TypeScript string literals.
 *
 * ```mermaid
 * graph TD
 *   A[Start escapeStringLiteral] --> B[Replace newline and tab with space]
 *   B --> C[Remove zero width and BOM characters]
 *   C --> D[Replace full width spaces with normal space]
 *   D --> E[Collapse multiple spaces into one]
 *   E --> F[Escape backslashes]
 *   F --> G[Escape single quotes]
 *   G --> H[Trim leading and trailing spaces]
 *   H --> I[Return escaped string]
 * ```
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
 * ```mermaid
 * graph TD
 *   A[Start getToSafeIdentifier] --> B[Check if matches identifier regex]
 *   B --> C[If matches, return string as is]
 *   B --> D[If not, wrap with JSON stringify]
 *   C --> E[Return result]
 *   D --> E[Return result]
 * ```
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
export function getToSafeIdentifier(str: string): string {
  return /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(str) ? str : JSON.stringify(str)
}

/**
 * Converts a string to a safe TypeScript identifier.
 *
 * ```mermaid
 * graph TD
 *   A[Start sanitizeIdentifier] --> B[Replace invalid characters with underscore]
 *   B --> C[Return sanitized string]
 * ```
 *
 * Replaces any character not matching `[A-Za-z0-9_$]` with `_`.
 *
 * @param str - The raw string to sanitize.
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
export function sanitizeIdentifier(str: string): string {
  return str.replace(/[^A-Za-z0-9_$]/g, '_')
}

/**
 * Appends a properly escaped `.regex(/pattern/)` clause.
 *
 * Any unescaped forward-slash within the pattern is escaped so the final
 * string remains a valid JavaScript RegExp literal.
 *
 * ```mermaid
 * graph TD
 *   A[Start regex(pattern)] --> B[Receive raw regex pattern without slashes]
 *   B --> C[Find all '/' not preceded by '\\']
 *   C --> D[Escape them to '\\/']
 *   D --> E[Wrap pattern in '/ ... /']
 *   E --> F[Prefix with '.regex(' and suffix with ')']
 *   F --> G[Return generated string]
 * ```
 *
 * @param pattern - A raw regex pattern **without** the surrounding slashes.
 * @returns A string like `'.regex(/^[a-z]+$/)'`.
 */
export function regex(pattern: string): string {
  return `.regex(/${pattern.replace(/(?<!\\)\//g, '\\/')}/)`
}
