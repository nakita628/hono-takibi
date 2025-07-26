/**
 * Removes `.max(n)` from a string if it matches the given maximum value.
 *
 * @param str - The input string (e.g., a Zod schema string).
 * @param maximum - The numeric value to match in `.max(...)`.
 * @returns The string with `.max(n)` removed if present.
 *
 * @example
 * ```ts
 * stripMaxIfLtExist('z.string().max(30)', 30)
 * // → 'z.string()'
 *
 * stripMaxIfLtExist('z.string().min(1).max(100)', 100)
 * // → 'z.string().min(1)'
 *
 * stripMaxIfLtExist('z.string().min(1)', 10)
 * // → 'z.string().min(1)' (unchanged)
 * ```
 */
export function stripMaxIfLtExist(str: string, maximum: number): string {
  return str.replace(`.max(${maximum})`, '')
}

/**
 * Removes `.min(n)` from a string if it matches the given minimum value.
 *
 * @param str - The input string (e.g., a Zod schema string).
 * @param minimum - The numeric value to match in `.min(...)`.
 * @returns The string with `.min(n)` removed if present.
 *
 * @example
 * ```ts
 * stripMinIfgtExist('z.string().min(1)', 1)
 * // → 'z.string()'
 *
 * stripMinIfgtExist('z.string().min(5).max(100)', 5)
 * // → 'z.string().max(100)'
 *
 * stripMinIfgtExist('z.string().max(50)', 5)
 * // → 'z.string().max(50)' (unchanged)
 * ```
 */
export function stripMinIfgtExist(str: string, minimum: number): string {
  return str.replace(`.min(${minimum})`, '')
}

/**
 * Removes `.min(...)` and `.max(...)` from a string if they match the given values.
 *
 * @param str - The input string (e.g., a Zod schema string).
 * @param min - The value to match in `.min(...)`.
 * @param max - The value to match in `.max(...)`.
 * @returns The string with matching `.min(...)` and `.max(...)` removed.
 *
 * @example
 * ```ts
 * stripMinMaxExist('z.string().min(1).max(100)', 1, 100)
 * // → 'z.string()'
 *
 * stripMinMaxExist('z.string().min(1).max(50)', 1, 100)
 * // → 'z.string().max(50)' (only `.min(1)` removed)
 *
 * stripMinMaxExist('z.string().max(100)', 1, 100)
 * // → 'z.string()' (only `.max(100)` removed)
 *
 * stripMinMaxExist('z.string()', 1, 100)
 * // → 'z.string()' (unchanged)
 * ```
 */
export function stripMinMaxExist(str: string, min: number, max: number): string {
  return str.replace(`.min(${min})`, '').replace(`.max(${max})`, '')
}

/**
 * Generate a Zod array schema string using `z.array()`.
 *
 * @param zodSchema - The schema string for array elements (e.g., `'Address'`, `'z.string().min(3)'`).
 * @returns The Zod `z.array()` schema string.
 *
 * @example
 * array('z.string()') // => 'z.array(z.string())'
 * array('User') // => 'z.array(User)'
 */
export function array(zodSchema: string): string {
  return `z.array(${zodSchema})`
}

/**
 * Generate a Zod `z.coerce.*` schema string.
 *
 * @param zodSchema - The Zod schema string to coerce to.
 * @returns The Zod coercion string.
 *
 * @example
 * coerce('z.string()') // => 'z.coerce.string()'
 * coerce('z.number().min(1)') // => 'z.coerce.number().min(1)'
 */
export function coerce(zodSchema: string): string {
  return `z.coerce.${zodSchema.replace('z.', '')}`
}

/**
 * Generate a Zod `.default()` validation string.
 *
 * @param unknown - The default value to apply.
 * @returns The Zod `.default()` string.
 *
 * @example
 * _default('guest') // => '.default("guest")'
 * _default(0) // => '.default(0)'
 * _default(true) // => '.default(true)'
 */
export function _default(defaultValue: unknown): string {
  return `.default(${JSON.stringify(defaultValue)})`
}

/**
 * Generate Zod `.gt()` (greater than) validation string.
 *
 * @param minimum - The exclusive lower bound.
 * @returns The Zod `.gt()` string.
 *
 * @example
 * gt(5) // => ".gt(5)"
 * gt(10) // => ".gt(10)"
 */
export function gt(minimum: number): string {
  return `.gt(${minimum})`
}

/**
 * Generate Zod `z.intersection()` schema string.
 *
 * @param schemas - An array of schema strings to intersect.
 * @returns The Zod `z.intersection()` string.
 *
 * @example
 * intersection(['z.string()', 'z.min(3)'])
 * // => z.intersection(z.string(),z.min(3))
 */
export function intersection(schemas: string[]): string {
  return `z.intersection(${schemas.join(',')})`
}

/**
 * Generate Zod `.length()` validation string.
 *
 * @param length - The exact length to validate against.
 * @returns The Zod `.length()` string.
 *
 * @example
 * length(5) // => ".length(5)"
 * length(10) // => ".length(10)"
 */
export function length(length: number): string {
  return `.length(${length})`
}

/**
 * Generate Zod `.lt()` (less than) validation string.
 *
 * @param maximum - The exclusive upper bound.
 * @returns The Zod `.lt()` string.
 *
 * @example
 * lt(5) // => ".lt(5)"
 * lt(100) // => ".lt(100)"
 */
export function lt(maximum: number): string {
  return `.lt(${maximum})`
}

/**
 * Generate Zod `.max()` validation string.
 *
 * @param max - The maximum value.
 * @returns The Zod `.max()` string.
 *
 * @example
 * max(5) // => ".max(5)"
 * max(100) // => ".max(100)"
 */
export function max(max: number): string {
  return `.max(${max})`
}

/**
 * Generate Zod `.min()` validation string.
 *
 * @param min - The minimum value.
 * @returns The Zod `.min()` string.
 *
 * @example
 * min(1) // => ".min(1)"
 * min(10) // => ".min(10)"
 */
export function min(min: number): string {
  return `.min(${min})`
}

/**
 * Generates a Zod partial schema.
 *
 * @param objectProperties - Object properties.
 * @returns The generated Zod partial schema string.
 */
export function partial(objectProperties: string[]): string {
  const cleanProperties = objectProperties.map((prop) => prop.replace('.optional()', ''))
  return `z.object({${cleanProperties}}).partial()`
}

/**
 * Generates a Zod regex validation string.
 *
 * @param pattern - Regex pattern.
 * @returns The generated Zod regex schema string.
 */
export function regex(pattern: string): string {
  return `.regex(/${pattern.replace(/(?<!\\)\//g, '\\/')}/)`
}

/**
 * Generates a Zod object schema from a record of property types.
 *
 * @param object - Record of property names and their Zod type strings.
 * @returns The generated Zod object schema string.
 */
export function schema(object: Record<string, string>): string {
  return `z.object({${Object.entries(object)
    .map(([key, val]) => `${key}:${val}`)
    .join(',')}})`
}

/**
 * Replaces 'boolean' with 'stringbool' in a Zod schema string.
 *
 * @param zodSchema - The Zod schema string to convert.
 * @returns The converted Zod schema string.
 */
export function stringbool(zodSchema: string): string {
  return zodSchema.replace('boolean', 'stringbool')
}

/**
 * Generates a Zod union schema.
 *
 * @param schemas - An array of Zod schema strings.
 * @returns A Zod union schema string.
 */
export function union(schemas: string[]): string {
  return `z.union([${schemas.join(',')}])`
}
