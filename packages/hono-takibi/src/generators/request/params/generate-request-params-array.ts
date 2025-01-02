import type { ParamsObject } from '../../../types'
import { generateZodObjectSchema } from '../../zod/generate-zod-object-schema'

/**
 * Generates an array of Zod schema strings for non-empty parameter sections
 *
 * @function generateRequestParamsArray
 * @param paramsObj - Object containing query, path, and header parameter schemas
 * @returns Array of Zod schema strings for non-empty parameter sections
 *
 * @example
 * // Input object with query and path parameters
 * const params = {
 *   query: { page: 'z.string()', limit: 'z.number()' },
 *   params: { id: 'z.string()' },
 *   headers: {}
 * }
 *
 * generateRequestParamsArray(params)
 * // Returns:
 * // [
 * //   'query:z.object({ page: z.string(), limit: z.number() })',
 * //   'params:z.object({ id: z.string() })'
 * // ]
 *
 * @example
 * // Input object with only headers
 * const params = {
 *   query: {},
 *   params: {},
 *   headers: { 'x-api-key': 'z.string()' }
 *   body: {}
 * }
 *
 * generateRequestParamsArray(params)
 * // Returns:
 * // ['headers:z.object({ "x-api-key": z.string() })']
 */
export function generateRequestParamsArray(paramsObj: ParamsObject): string[] {
  // 1.  define sections to be processed
  const sections = Object.entries(paramsObj)
    .filter(([_, obj]) => obj && Object.keys(obj).length > 0)
    .map(([section]) => section)

  // 2. processing of each section
  return (
    sections
      .map((section) => {
        const obj = paramsObj[section]
        // 2.1 process only if object is not empty
        if (Object.keys(obj).length) {
          const schema = generateZodObjectSchema(obj)
          return `${section}:${schema}`
        }
        return null
      })
      // 3. exclude null and return only an array of strings
      .filter((item): item is string => item !== null)
  )
}
