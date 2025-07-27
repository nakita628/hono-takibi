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
