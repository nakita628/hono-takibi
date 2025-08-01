/* ========================================================================== *
 *  CLI Argument Parsing
 * ========================================================================== */

/**
 * Parses CLI arguments into structured options.
 *
 * @param args - Raw CLI arguments.
 * @returns A `Result` containing parsed CLI options or an error message.
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
      error?: undefined
    }
  | {
      ok: false
      error: string
      value?: undefined
    } {
  const input = args[0]
  const oIdx = args.indexOf('-o')
  const output = oIdx !== -1 ? args[oIdx + 1] : undefined
  const isYamlOrJsonOrTsp = (
    i: string,
  ): i is `${string}.yaml` | `${string}.json` | `${string}.tsp` =>
    i.endsWith('.yaml') || i.endsWith('.json') || i.endsWith('.tsp')
  const isTs = (o: string): o is `${string}.ts` => o.endsWith('.ts')
  const getFlagValue = (args: readonly string[], flag: string): string | undefined => {
    const idx = args.indexOf(flag)
    if (idx !== -1 && args[idx + 1] && !args[idx + 1].startsWith('-')) return args[idx + 1]
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

/* ========================================================================== *
 *  Handler-Generation Utilities
 * ========================================================================== */

/**
 * Generates import statements for route handler modules.
 *
 * @param importsMap - A map where keys are file paths (ending with `.ts`) and values are arrays of exported identifiers.
 * @returns An array of import statements as strings.
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
 * Generates registration code for OpenAPI security schemes.
 *
 * @param securitySchemes - A record of security scheme definitions.
 * @returns A string of code registering each security scheme to the OpenAPI registry.
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

/* ========================================================================== *
 *  Handler Utilities
 *    └─ Everything below relates to generating, grouping, or importing route
 *       handler functions.
 * ========================================================================== */

/**
 * Generates import statements for handler functions.
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

/* ---------- HTTP-specific ----------------------------------------------- */

/**
 * Checks if a given string is a valid HTTP method.
 *
 * Narrows the type to one of the standard lowercase HTTP methods if matched.
 *
 * @param method - The string to check.
 * @returns `true` if the string is a valid HTTP method (e.g., `'get'`, `'post'`), otherwise `false`.
 *
 * @example
 * ```ts
 * isHttpMethod('get')     // true
 * isHttpMethod('POST')    // false (case-sensitive)
 * isHttpMethod('delete')  // true
 * isHttpMethod('foobar')  // false
 * ```
 *
 * @remarks
 * - This check is case-sensitive; `'GET'` will return `false`.
 * - Returns a type predicate for narrowing: `method is HttpMethod`.
 */
export function isHttpMethod(
  method: string,
): method is 'get' | 'post' | 'put' | 'delete' | 'patch' | 'head' | 'options' | 'trace' {
  return (
    method === 'get' ||
    method === 'post' ||
    method === 'put' ||
    method === 'delete' ||
    method === 'patch' ||
    method === 'options' ||
    method === 'head' ||
    method === 'trace'
  )
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
  $ref?: string
  [key: string]: unknown
} {
  return typeof value === 'object' && value !== null
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

/* ========================================================================== *
 *  OpenAPI $ref
 * ========================================================================== */

/**
 * Extracts the type name from an OpenAPI `$ref` string.
 *
 * Returns the last segment of the path, typically the schema name.
 *
 * @param $ref - A reference path like `#/components/schemas/Address`.
 * @returns The extracted type name, or `undefined` if invalid.
 *
 * @example
 * ```ts
 * refName('#/components/schemas/Address')
 * // → 'Address'
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

/* ========================================================================== *
 *  Route Code Generation
 *    • createRoute itself
 *    • utilities that build or modify the `request:{ ... }` object
 * ========================================================================== */

/**
 * Generates a PascalCase route name from HTTP method and path.
 *
 * @param method - HTTP method (e.g., 'get', 'post').
 * @param path - URL path (e.g., '/users/{id}/posts').
 * @returns A route name string (e.g., 'getUsersIdPostsRoute').
 *
 * @example
 * routeName('get', '/users/{id}/posts') // 'getUsersIdPostsRoute'
 */
export function routeName(method: string, path: string): string {
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
  return `${method}${apiPath}Route`
}

/**
 * Generates a Hono route definition as a TypeScript export string.
 *
 * @param args - Route metadata and OpenAPI-compliant fields.
 * @returns A string representing a `createRoute` export statement.
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

/* ========================================================================== *
 *  Request Parameters
 * ========================================================================== */

/**
 * Generates an array of Zod validator strings from OpenAPI parameter objects.
 *
 * @param parameters - An object containing `query`, `path`, and `header` parameters.
 * @returns An array of strings like `'query:z.object({...})'` or `'params:z.object({...})'`.
 *
 * @remarks
 * - Skips empty parameter sections.
 * - Converts `path` section to `params` (Hono convention).
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
            .map(([key, val]) => `${key}:${val}`)
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

/* ========================================================================== *
 *  String Escaping
 * ========================================================================== */

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

/* ========================================================================== *
 *  Identifier
 * ========================================================================== */

/**
 * Converts a string to a safe TypeScript object key.
 *
 * Returns the string as-is if it is a valid identifier.
 * Otherwise, it wraps the string in quotes using `JSON.stringify`.
 *
 * @param str - The string to convert.
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
export function getToSafeIdentifier(str: string): string {
  return /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(str) ? str : JSON.stringify(str)
}

/**
 * Converts a string to a safe TypeScript identifier.
 *
 * Replaces invalid characters with `_`, allowing only letters, digits, `_`, and `$`.
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
