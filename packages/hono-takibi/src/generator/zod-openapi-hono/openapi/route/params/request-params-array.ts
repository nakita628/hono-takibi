import type { ParamsObject } from '../../../../../openapi/index.js'
import { schema } from '../../../../zod/z/index.js'

/**
 * Generates an array of Zod schema strings for non-empty parameter sections
 * @param { ParamsObject } paramsObj - Object containing query, path, and header parameter schemas
 * @returns { string[] } Array of Zod schema strings
 */
export function requestParamsArray(paramsObj: ParamsObject): string[] {
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
          const s = schema(obj)
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
