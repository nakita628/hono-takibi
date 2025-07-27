/* ========================================================================== *
 *  CLI Argument Parsing
 * ========================================================================== */

/**
 * Gets the value following a CLI flag.
 *
 * @param args - CLI arguments.
 * @param flag - The flag to look for.
 * @returns The flag's value, or `undefined` if not found.
 */
export function getFlagValue(args: readonly string[], flag: string): string | undefined {
  const idx = args.indexOf(flag)
  if (idx !== -1 && args[idx + 1] && !args[idx + 1].startsWith('-')) return args[idx + 1]
  return undefined
}

/**
 * Checks if a CLI flag is present.
 *
 * @param args - CLI arguments.
 * @param f - The flag to check.
 * @returns `true` if present, `false` otherwise.
 */
export function hasFlag(args: readonly string[], f: string): boolean {
  return args.includes(f)
}

/**
 * Determines whether help was requested.
 *
 * @param args - CLI arguments.
 * @returns `true` if `--help` or `-h` is the only argument.
 */
export function isHelpRequested(args: readonly string[]): boolean {
  return args.length === 1 && (args[0] === '--help' || args[0] === '-h')
}

/**
 * Slices off the first two CLI arguments (`node` and script path).
 *
 * @param argv - Full process arguments.
 * @returns User-supplied arguments.
 */
export function sliceArgv(argv: readonly string[]): string[] {
  return argv.slice(2)
}

/**
 * Checks if a string is a valid `.ts` file (excluding `.d.ts`).
 *
 * @param o - The file path to check.
 * @returns `true` if the path ends with `.ts` and not `.d.ts`.
 */
export function isTs(o: string): o is `${string}.ts` {
  return o.endsWith('.ts') && !o.endsWith('.d.ts')
}

/**
 * Checks if a string ends with `.yaml`, `.json`, or `.tsp`.
 *
 * @param i - The file path to check.
 * @returns `true` if the path is a supported input format.
 */
export function isYamlOrJsonOrTsp(
  i: string,
): i is `${string}.yaml` | `${string}.json` | `${string}.tsp` {
  return i.endsWith('.yaml') || i.endsWith('.json') || i.endsWith('.tsp')
}

/* ========================================================================== *
 *  Handler-Generation Utilities
 * ========================================================================== */

/**
 * Generate app route handler
 *
 * @param routeName - Route name
 * @param handlerName - Handler function name
 * @returns A string representing the `.openapi()` route handler call
 */
export function appRouteHandler(routeName: string, handlerName: string) {
  return `.openapi(${routeName},${handlerName})`
}

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
      return `app.openAPIRegistry.registerComponent('securitySchemes', '${name}', ${JSON.stringify(scheme)})`
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

/**
 * Generates the application route handlers.
 *
 * @param routeMappings - An array of route definitions with route and handler names.
 * @returns A string of `.openapi(...)` calls joined by newline.
 */
export function applyOpenapiRoutes(
  routeMappings: {
    routeName: string
    handlerName: string
    path: string
  }[],
) {
  return routeMappings
    .map(({ routeName, handlerName }) => {
      return `.openapi(${routeName},${handlerName})`
    })
    .join('\n')
}

/* ========================================================================== *
 *  Handler Utilities
 *    └─ Everything below relates to generating, grouping, or importing route
 *       handler functions.
 * ========================================================================== */

/**
 * Generates a route handler function declaration.
 *
 * @param handlerName - The name of the handler function.
 * @param routeName - The name of the route definition.
 * @returns The TypeScript code string for the handler function.
 */
export function handler(handlerName: string, routeName: string): string {
  return `export const ${handlerName}:RouteHandler<typeof ${routeName}>=async(c)=>{}`
}

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

/* ========================================================================== *
 *  Schema / Type Predicates
 * ========================================================================== */

/* ---------- Zod property strings ---------------------------------------- */

/**
 * Checks if all object properties are marked as optional.
 *
 * Expects each property string to include `.optional()` if it is optional.
 *
 * @param objectProperties - List of property expressions (e.g., Zod property strings).
 * @returns `true` if all properties contain `.optional()`, otherwise `false`.
 *
 * @example
 * ```ts
 * isAllOptional(['z.string().optional()', 'z.number().optional()'])
 * // → true
 *
 * isAllOptional(['z.string()', 'z.number().optional()'])
 * // → false
 *
 * isAllOptional([])
 * // → true
 * ```
 */
export function isAllOptional(objectProperties: string[]): boolean {
  return objectProperties.every((prop) => prop.includes('.optional()'))
}

/* ---------- OpenAPI schema structures ----------------------------------- */

/**
 * Checks whether a schema represents an array whose items are a `$ref` reference.
 *
 * @param schema - The OpenAPI schema object to check.
 * @returns `true` if the schema is an array with `$ref` in its `items` field, otherwise `false`.
 *
 * @example
 * ```ts
 * isArrayWithSchemaReference({
 *   type: 'array',
 *   items: { $ref: '#/components/schemas/User' }
 * })
 * // → true
 *
 * isArrayWithSchemaReference({
 *   type: 'array',
 *   items: { type: 'string' }
 * })
 * // → false
 *
 * isArrayWithSchemaReference({
 *   type: 'object'
 * })
 * // → false
 * ```
 */
export function isArrayWithSchemaReference(schema: unknown): boolean {
  if (typeof schema !== 'object' || schema === null) {
    return false
  }
  if (!('type' in schema) || schema.type !== 'array') {
    return false
  }
  if (!('items' in schema) || typeof schema.items !== 'object') {
    return false
  }
  if (schema.items !== null && typeof schema.items === 'object' && !('$ref' in schema.items)) {
    return false
  }
  return schema.type === 'array' && Boolean(schema.items?.$ref)
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
 * Checks if a schema is exactly `{ nullable: true }`.
 *
 * @param schema - The schema object to evaluate.
 * @returns `true` if the schema has only `nullable: true`, otherwise `false`.
 *
 * @example
 * ```ts
 * isNullableSchema({ nullable: true })                // true
 * isNullableSchema({ nullable: true, type: 'string' }) // false
 * isNullableSchema({})                                 // false
 * ```
 */
export function isNullableSchema(schema: unknown): boolean {
  if (typeof schema !== 'object' || schema === null) {
    return false
  }
  return 'nullable' in schema && schema.nullable === true && Object.keys(schema).length === 1
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
export function refName($ref: `#/components/schemas/${string}`): string | undefined {
  // split('/'): Split a string into an array using slashes
  // 1. ["#", "components", "schemas", "Address"]
  // pop() to get the last element
  // 2. "Address"
  return $ref.split('/').pop()
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

/**
 * Wraps the request body code in a `request:{...}` block.
 *
 * @param requestBodyCode - Zod schema string for the request body.
 * @returns A string representing the wrapped request object.
 */
export function requestParams(requestBodyCode: string): string {
  return `request:{${requestBodyCode}},`
}

/**
 * Inserts request body validation code into an existing request parameter string.
 *
 * @param requestParams - The existing request parameter string (e.g., 'request:{...}').
 * @param requestBodyCode - The request body code to insert.
 * @returns The combined request validation string with the body inserted.
 */

export function insertRequestBody(requestParams: string, requestBodyCode: string): string {
  return requestParams.replace('request:{', `request:{${requestBodyCode}`)
}

/**
 * Formats request validation parameters into a `request:{...}` object string.
 *
 * @param requestParamsArray - An array of Zod schema strings (e.g., `query`, `params`, etc.).
 * @returns A TypeScript code string representing the `request` object.
 *
 * @example
 * formatRequestObject(['query:z.object({ page: z.string() })'])
 * // → 'request:{query:z.object({ page: z.string() })},'
 */
export function formatRequestObject(requestParamsArray: string[]): string {
  return `request:{${requestParamsArray.join(',')}},`
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

/* ========================================================================== *
 *  Zod Schema
 * ========================================================================== */

/**
 * Returns a string literal representing a Zod array schema.
 *
 * @param itemSchema - A stringified Zod schema for the array elements
 *                     (e.g. `'Address'`, `'z.string().min(3)'`).
 * @returns A string such as `'z.array(Address)'` or
 *          `'z.array(z.string().min(3))'`.
 *
 * @example
 * ```ts
 * array('z.string()');       // → 'z.array(z.string())'
 * array('User');             // → 'z.array(User)'
 * ```
 */
export function array(itemSchema: string): string {
  return `z.array(${itemSchema})`
}

/**
 * Prepends `z.coerce.` to a stringified Zod schema, transforming
 * `z.type()` into `z.coerce.type()`.
 *
 * @param rawSchema - Any string that starts with `'z.'`.
 * @returns The coerced schema string.
 *
 * @example
 * ```ts
 * coerce('z.string()');            // → 'z.coerce.string()'
 * coerce('z.number().min(1)');     // → 'z.coerce.number().min(1)'
 * ```
 */
export function coerce(rawSchema: string): string {
  return `z.coerce.${rawSchema.replace('z.', '')}`
}

/**
 * Appends a `.default()` clause to a Zod validation chain.
 *
 * @param value - The default value. It is JSON-stringified verbatim.
 * @returns A string like `'.default("guest")'` or `'.default(0)'`.
 *
 * @example
 * ```ts
 * _default('guest');   // → '.default("guest")'
 * _default(0);         // → '.default(0)'
 * ```
 */
export function _default(value: unknown): string {
  return `.default(${JSON.stringify(value)})`
}

/**
 * Appends `.gt(<n>)` ( exclusive “greater than” ) to a validation chain.
 *
 * @param exclusiveMin - The lower bound (exclusive).
 * @returns A string such as `'.gt(42)'`.
 */
export function gt(exclusiveMin: number): string {
  return `.gt(${exclusiveMin})`
}

/**
 * Builds `z.intersection(schemaA, schemaB, …)` for two or more schemas.
 *
 * @param schemas - Stringified schemas to be intersected.
 * @returns A single `z.intersection()` expression.
 *
 * @example
 * ```ts
 * intersection(['SchemaA', 'SchemaB']);
 * // → 'z.intersection(SchemaA,SchemaB)'
 * ```
 */
export function intersection(schemas: string[]): string {
  return `z.intersection(${schemas.join(',')})`
}

/**
 * Appends `.length(<n>)` ( exact length ) to a validation chain.
 *
 * @param len - The required length.
 * @returns A string like `'.length(5)'`.
 */
export function length(len: number): string {
  return `.length(${len})`
}

/**
 * Appends `.lt(<n>)` ( exclusive “less than” ) to a validation chain.
 *
 * @param exclusiveMax - The upper bound (exclusive).
 * @returns A string such as `'.lt(99)'`.
 */
export function lt(exclusiveMax: number): string {
  return `.lt(${exclusiveMax})`
}

/**
 * Appends `.max(<n>)` ( inclusive maximum ) to a validation chain.
 *
 * @param maxValue - The upper bound (inclusive).
 * @returns A string like `'.max(100)'`.
 */
export function max(maxValue: number): string {
  return `.max(${maxValue})`
}

/**
 * Appends `.min(<n>)` ( inclusive minimum ) to a validation chain.
 *
 * @param minValue - The lower bound (inclusive).
 * @returns A string like `'.min(1)'`.
 */
export function min(minValue: number): string {
  return `.min(${minValue})`
}

/**
 * Produces `z.object({ … }).partial()` while stripping pre-existing
 * `.optional()` from individual property strings.
 *
 * @param properties - Array entries in the form `'key: z.string().optional()'`.
 * @returns A string such as `'z.object({key:z.string()}).partial()'`.
 */
export function partial(properties: string[]): string {
  const cleanProperties = properties.map((prop) => prop.replace('.optional()', ''))
  return `z.object({${cleanProperties}}).partial()`
}

/**
 * Appends a properly escaped `.regex(/pattern/)` clause.
 *
 * Any unescaped forward-slash within the pattern is escaped so the final
 * string remains a valid JavaScript RegExp literal.
 *
 * @param pattern - A raw regex pattern **without** the surrounding slashes.
 * @returns A string like `'.regex(/^[a-z]+$/)'`.
 */
export function regex(pattern: string): string {
  return `.regex(/${pattern.replace(/(?<!\\)\//g, '\\/')}/)`
}

/**
 * Builds a `z.object({ … })` expression from a plain record.
 *
 * @param properties - Key/value pairs where each value is a Zod type string.
 * @returns A string such as `'z.object({name:z.string(),age:z.number()})'`.
 */
export function schema(properties: Record<string, string>): string {
  return `z.object({${Object.entries(properties)
    .map(([key, val]) => `${key}:${val}`)
    .join(',')}})`
}

/**
 * Replaces occurrences of `'boolean'` with `'stringbool'` inside a schema
 * string. Useful when generating “boolean‐as‐string” validations.
 *
 * @param source - The original Zod schema string.
 * @returns The transformed schema string.
 */
export function stringbool(schema: string): string {
  return schema.replace('boolean', 'stringbool')
}

/**
 * Builds `z.union([schemaA, schemaB, …])` from multiple schemas.
 *
 * @param schemas - Stringified Zod schemas.
 * @returns A union schema string.
 *
 * @example
 * ```ts
 * union(['A', 'B']);  // → 'z.union([A,B])'
 * ```
 */
export function union(schemas: string[]): string {
  return `z.union([${schemas.join(',')}])`
}
